import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnnouncementService } from './announcement.service'
import { AnnouncementController } from './announcement.controller'
import { Announcement } from './entities/announcement.entity'
import { FileModule } from '../file/file.module'
import { UserModule } from '../user/user.module'
import { AnnouncementTransformer } from './announcement.transformer'
import { Comment } from '../comment/entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, Comment]), FileModule, UserModule],
  providers: [AnnouncementService, AnnouncementTransformer],
  controllers: [AnnouncementController],
})
export class AnnouncementModule { }
