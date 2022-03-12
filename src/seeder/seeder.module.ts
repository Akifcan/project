import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../modules/user/entites/user.entity'
import { Lesson } from '../entities/lesson.entity'
import { SeederController } from './seeder.controller'
import { SeederService } from './seeder.service'
import { Schedule } from '../modules/schedule/entities/schedule.entity'
import { File } from 'src/modules/file/entities/file.entity'
import { Announcement } from '../modules/announcement/entities/announcement.entity'
import { Demand } from '../modules/demand/entities/demand.entity'
import { DemandConversation } from '../modules/demand/entities/demandConversation.entity'
import { DemandActivity } from '../modules/demand/entities/demandActivity.entity'
import { Comment } from '../modules/comment/entities/comment.entity'
import { Post } from '../modules/post/entities/post.entity'
import { MediaPost } from '../modules/post/entities/mediaPost.entity'
import { EventPost } from '../modules/post/entities/eventPost.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson, Schedule, File, Announcement, Demand, DemandConversation, DemandActivity, Post, Comment, MediaPost, EventPost])],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule { }
