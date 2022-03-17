import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Announcement } from '../announcement/entities/announcement.entity'
import { Notification } from './entities/notification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, Notification])],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService]
})
export class NotificationModule { }
