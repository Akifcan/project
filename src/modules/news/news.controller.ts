import { Controller, Get, Inject, Post } from '@nestjs/common'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {

    @Inject() private readonly newsService: NewsService

    @Post("/generate-news")
    generateNews() {
        return this.newsService.createNews()
    }

    @Post("/generate-announcements")
    generateAnnouncements() {
        return this.newsService.createAnnouncements()
    }

    @Get("/last")
    lastNews() {
        return this.newsService.getLastNews()
    }

    @Get("/announcements")
    announcements() {
        return this.newsService.getAnnouncements()
    }


}
