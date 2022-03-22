import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { HttpModule } from '@nestjs/axios'
import { RedisCacheModule } from '../../redis-cache/redis-cache.module'
import { ScheduleModule } from '@nestjs/schedule'


@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    RedisCacheModule
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule { }
