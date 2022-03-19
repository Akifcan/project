import { Inject, Injectable } from "@nestjs/common"
import UserTransformer from "../user/user.transformer"
import { Conversation } from "./entities/conversation.entity"
import { Message } from "./entities/message.entity"

@Injectable()
export class ConversationTransformer {

    @Inject() private readonly userTransformer: UserTransformer

    myConversations(currentUserId: number, conversations: Conversation[]) {
        return conversations.map(conversation => {
            const { sender, receiver, ...rest } = conversation
            return {
                with: sender.id === currentUserId ? this.userTransformer.user(receiver) : this.userTransformer.user(sender),
                ...rest
            }
        })
    }

    textToPublicEntity(messages: Message[]) {
        return messages.map(message => {
            const { sender, ...rest } = message
            return { ...rest, sender: this.userTransformer.user(sender) }

        })
    }
}