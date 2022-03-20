import { Body, Controller, Inject, Param, Post, Get } from '@nestjs/common'
import { User } from 'src/common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { ConversationService } from './conversation.service'
import { SendMessageDto } from './dtos/sendMessageDto.dto'

@Controller('conversation')
export class ConversationController {

    @Inject() private readonly conversationService: ConversationService

    @Get("/me")
    myConversations(@User() user: CurrentUserProps) {
        return this.conversationService.myConversations(user.id)
    }

    @Get("/detail/:receiverId")
    conversationDetail(@User() user: CurrentUserProps, @Param() params: { receiverId: number }) {
        return this.conversationService.conversationDetail(user.id, params.receiverId)
    }

    @Get("/conversation/:id")
    conversation(@Param() params: { id: number }, @User() user: CurrentUserProps) {
        return this.conversationService.conversation(params.id, user.id)
    }

    @Post("/send-message/:userId")
    sendMessage(@Param() params: { userId: number }, @Body() sendMessageDto: SendMessageDto, @User() user: CurrentUserProps) {
        return this.conversationService.sendMessage(sendMessageDto, user.id, +params.userId)
    }

}
