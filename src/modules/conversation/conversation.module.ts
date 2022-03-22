import { Module } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { ConversationController } from './conversation.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Conversation } from './entities/conversation.entity'
import { Message } from './entities/message.entity'
import { ConversationTransformer } from './conversation.transformer'
import UserTransformer from '../user/user.transformer'
import { NotificationModule } from '../notification/notification.module'

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message]), NotificationModule],
  providers: [ConversationService, ConversationTransformer, UserTransformer],
  controllers: [ConversationController]
})
export class ConversationModule { }
