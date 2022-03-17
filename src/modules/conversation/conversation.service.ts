import { Body, Injectable } from '@nestjs/common'
import { SendMessageDto } from './dtos/sendMessageDto.dto'

@Injectable()
export class ConversationService {

    sendMessage(messageDto: SendMessageDto) { }

}
