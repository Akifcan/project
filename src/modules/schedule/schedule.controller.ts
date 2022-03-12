import { Controller, Get, Inject } from '@nestjs/common'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { ScheduleService } from './schedule.service'

@Controller('schedule')
export class ScheduleController {

    @Inject() readonly scheduleService: ScheduleService

    @Get()
    lessonSchedule(@User() user: CurrentUserProps) {
        return this.scheduleService.scheduleOfUser(user.id)
    }

}
