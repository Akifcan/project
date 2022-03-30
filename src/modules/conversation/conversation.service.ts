import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConversationTransformer } from './conversation.transformer'
import { SendMessageDto } from './dtos/sendMessageDto.dto'
import { Conversation } from './entities/conversation.entity'
import { Message } from './entities/message.entity'
import { Payload } from '@nestjs/microservices'
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { NotificationService } from '../notification/notification.service'


@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@Injectable()
export class ConversationService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @Inject() private readonly notificationService: NotificationService

    @WebSocketServer() server: Server
    private logger: Logger = new Logger('AppGateway')

    conversationPrefix = "conversation-"

    afterInit() {
        this.logger.log('Init')
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`)
    }

    @SubscribeMessage('join-chatroom')
    joinChatroom(@Payload() data: number) {
        this.server.socketsJoin(this.conversationPrefix + data.toString())
        this.logger.log("joined ", this.conversationPrefix + data.toString())
    }


    @InjectRepository(Conversation) readonly conversationRepository: Repository<Conversation>
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>

    @Inject() private readonly conversationTransformer: ConversationTransformer

    async myConversations(userId: number) {

        const conversations = await this.conversationRepository.find({
            where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
            relations: ["sender", "receiver"],
            order: { lastMessageTime: -1 }
        })
        return this.conversationTransformer.myConversations(userId, conversations)
    }

    async conversationDetail(currentUserId: number, receiverUserId: number) {

        const conversation = await this.conversationRepository.createQueryBuilder("conversation")
            .where(" (conversation.sender.id = :senderId and conversation.receiver.id = :receiverId) or (conversation.sender.id = :receiverId and conversation.receiver.id = :senderId)", { senderId: currentUserId, receiverId: receiverUserId })
            .getOne()
        return {
            success: conversation ? true : false,
            id: conversation ? conversation.id : null
        }
    }

    async conversation(conversationId: number, userId: number) {
        const conversations = await this.conversationRepository.createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.messages", "messages")
            .leftJoinAndSelect("messages.sender", "user")
            .where("conversation.id = :id and (conversation.receiverId = :userId or conversation.senderId = :userId)", { id: conversationId, userId })
            .orderBy("messages.createdAt", "ASC")
            .getOne()

        if (!conversations) {
            throw new UnauthorizedException()
        }

        return this.conversationTransformer.textToPublicEntity(conversations.messages)
    }

    async sendMessage(messageDto: SendMessageDto, currentUserId: number, receiverId: number) {

        let conversation = await this.currentConversation([currentUserId, receiverId])

        if (!conversation) {
            Logger.log("new")
            conversation = await this.conversationRepository.save(this.conversationRepository.create({
                lastMessage: messageDto.body,
                sender: { id: currentUserId },
                receiver: { id: receiverId }
            }))
            this.notificationService.sendConversationNotification("message", currentUserId, receiverId, "Message", "Started a conversation with you!", conversation.id)
        } else {
            await this.conversationRepository.update({ id: conversation.id }, { lastMessage: messageDto.body })
        }


        const text = await this.messageRepository.save(this.messageRepository.create({
            body: messageDto.body,
            sender: { id: currentUserId },
            conversation: { id: conversation.id }
        }))

        this.server.to(this.conversationPrefix + conversation.id.toString()).emit("new-message", text)

        return { conversation, text }
    }

    private async currentConversation(userIds: number[]) {
        return await this.conversationRepository.createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.sender", "sender")
            .leftJoinAndSelect("conversation.receiver", "receiver")
            .where(" (conversation.sender.id = :senderId and conversation.receiver.id = :receiverId) or (conversation.sender.id = :receiverId and conversation.receiver.id = :senderId)", { senderId: userIds[0], receiverId: userIds[1] })
            .getOne()
    }


}
