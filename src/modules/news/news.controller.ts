import { Controller, Get, Inject } from '@nestjs/common'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {

    @Inject() private readonly newsService: NewsService

    @Get("/last")
    lastNews() {
        return this.newsService.getLastNews()
    }

}
