import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Announcement } from '../announcement/entities/announcement.entity'
import { Notification } from './entities/notification.entity'
import { NotificationTransformer } from './notification.transformer'

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, Notification])],
  providers: [NotificationService, NotificationTransformer],
  controllers: [NotificationController],
  exports: [NotificationService]
})
export class NotificationModule { }
