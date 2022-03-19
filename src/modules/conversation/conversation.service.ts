import { Body, Injectable } from '@nestjs/common'
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
        // return this.conversationRepository.find({
        //     where: [{ sender: { id: userId } }, { reciever: { id: userId } }],
        //     order: { lastMessageTime: -1 },
        //     relations: ["messages", "messages.sender"]
        // })
    }


    async sendMessage(messageDto: SendMessageDto, currentUserId: number, receiverId: number) {

        const conversation = await this.isConversationExists([currentUserId, receiverId])

        if (!conversation) {
        }



        // let currentConversation = await this.conversationRepository.findOne({ where: [{ sender: { id: currentUserId } }, { reciever: { id: receiverId } }] })

        // if (!currentConversation) {
        //     currentConversation = await this.conversationRepository.save(this.conversationRepository.create({ sender: { id: currentUserId }, reciever: { id: receiverId } }))
        // }

        // currentConversation.lastMessageTime = new Date()
        // this.conversationRepository.save(currentConversation)

        // const text = await this.messageRepository.save(this.messageRepository.create({
        //     body: messageDto.body,
        //     sender: { id: currentUserId },
        //     conversation: { id: currentConversation.id }
        // }))

        // return { currentConversation, text }
    }

    private async isConversationExists(userIds: number[]) {
        const conversation = await this.conversationRepository.createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.users", "users")
            .where("users.id = :firstUser and users.id = :secondUser", { firstUser: userIds[0], secondUser: userIds[1] })
            .getOne()
        return conversation
    }


}
