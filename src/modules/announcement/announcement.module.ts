import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnnouncementService } from './announcement.service'
import { AnnouncementController } from './announcement.controller'
import { Announcement } from './entities/announcement.entity'
import { FileModule } from '../file/file.module'
import { UserModule } from '../user/user.module'
import { AnnouncementTransformer } from './announcement.transformer'
import { PostModule } from '../post/post.module'
import { RedisCacheModule } from '../../redis-cache/redis-cache.module'
import { NotificationModule } from '../notification/notification.module'

@Module({
  imports: [TypeOrmModule.forFeature([Announcement]), FileModule, UserModule, PostModule, RedisCacheModule, NotificationModule],
  providers: [AnnouncementService, AnnouncementTransformer],
  controllers: [AnnouncementController],
})
export class AnnouncementModule { }
