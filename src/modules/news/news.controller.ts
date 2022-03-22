import { Controller, Get, Inject, Post } from '@nestjs/common'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {

    @Inject() private readonly newsService: NewsService

    @Post("/generate-news")
    generateNews() {
        return this.newsService.createNews()
    }

    @Get("/last")
    lastNews() {
        return this.newsService.getLastNews()
    }

}
