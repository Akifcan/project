import { Controller, Get, Inject, Param } from '@nestjs/common'
import { NotificationService } from './notification.service'

@Controller('notification')
export class NotificationController {

    @Inject() private readonly notificationService: NotificationService


    @Get("/announcement/:id")
    sendAnnouncementNotificaiton(@Param() params: { id: number }) {
        return this.notificationService.sendAnnouncementNotification(params.id)
    }

}
