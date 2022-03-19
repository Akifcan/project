import { Body, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SendMessageDto } from './dtos/sendMessageDto.dto'
import { Conversation } from './entities/conversation.entity'
import { Message } from './entities/message.entity'

@Injectable()
export class ConversationService {

    @InjectRepository(Conversation) conversationRepository: Repository<Conversation>
    @InjectRepository(Message) messageRepository: Repository<Message>

    async myConversations(userId: number) {
        return this.conversationRepository.find({ where: [{ sender: { id: userId } }, { receiver: { id: userId } }] })
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
        } else {
            await this.conversationRepository.update({ id: conversation.id }, { lastMessage: messageDto.body })
        }


        const text = await this.messageRepository.save(this.messageRepository.create({
            body: messageDto.body,
            sender: { id: currentUserId },
            conversation: { id: conversation.id }
        }))

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
