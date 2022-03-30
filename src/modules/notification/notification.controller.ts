import { Controller, Get, Inject } from '@nestjs/common'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { NotificationService } from './notification.service'

@Controller('notification')
export class NotificationController {

    @Inject() private readonly notificaitonService: NotificationService

    @Get("/me")
    myNotifications(@User() user: CurrentUserProps) {
        return this.notificaitonService.myNotifications(user.id)
    }

}
