import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { AssistantService } from './assistant.service'

@Controller('assistant')
export class AssistantController {

    @Inject() private readonly assistanService: AssistantService

    @Get()
    generateAssistant() {
        return this.assistanService.generateAssistant()
    }

    @Post("/ask")
    ask(@Body() body: { question: string }) {



        return this.assistanService.ask(body.question)
    }

}
