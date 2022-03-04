import { Body, Controller, Inject, Post } from '@nestjs/common'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { DemandService } from './demand.service'
import { CreateDemandDto } from './dtos/createDemand.dto'

@Controller('demand')
export class DemandController {

    @Inject() private readonly demandService: DemandService

    @Post("/open-demand")
    createDemand(@User() user: CurrentUserProps, @Body() createDemandDto: CreateDemandDto) {
        return this.demandService.createDemand(user, createDemandDto)
    }

}
