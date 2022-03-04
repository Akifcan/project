import { Body, Controller, Get, Inject, Post, Delete, UseGuards, Param, Patch } from '@nestjs/common'
import RoleGuard from 'src/common/guards/role.guard'
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

    @Get("/my")
    myDemands(@User() user: CurrentUserProps) {
        return this.demandService.listMyDemands(user.id)
    }

    @UseGuards(new RoleGuard(["moderator"]))
    @Delete(":id")
    removeDemand(@Param() params: { id: number }) {
        return this.demandService.removeDemand(params.id)
    }

    @UseGuards(new RoleGuard(["moderator"]))
    @Patch("close/:id")
    closeDemand(@Param() params: { id: number }) {
        return this.demandService.closeDemand(params.id)
    }




}
