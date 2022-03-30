import { Body, Controller, Get, Inject, Post, Delete, UseGuards, Param, Patch } from '@nestjs/common'
import RoleGuard from '../../common/guards/role.guard'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { DemandService } from './demand.service'
import { CreateDemandDto } from './dtos/createDemand.dto'
import { ResponseDemandDto } from './dtos/responseDemand.dto'

@Controller('demand')
export class DemandController {

    @Inject() private readonly demandService: DemandService

    @Post("/open-demand")
    createDemand(@User() user: CurrentUserProps, @Body() createDemandDto: CreateDemandDto) {
        return this.demandService.createDemand(user, createDemandDto)
    }

    @Post("/resposne/:id")
    responseDemand(@User() user: CurrentUserProps, @Param() params: { id: number }, @Body() responseDemandDto: ResponseDemandDto) {
        return this.demandService.responseDemand(user, params.id, responseDemandDto)
    }


    @Get("detail/:id")
    demandDetail(@Param() params: { id: number }) {
        return this.demandService.demandDetail(params.id)
    }

    @Get("acitivites/:id")
    demandActivities(@Param() params: { id: number }) {
        return this.demandService.demandActivities(params.id)
    }


    @Get("forward/:demandId/:userId")
    forwardDemand(@User() user: CurrentUserProps, @Param() params: { demandId: number, userId: number }) {
        return this.demandService.forwardDemand(params.userId, params.demandId, user.id)
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
    closeDemand(@User() user: CurrentUserProps, @Param() params: { id: number }) {
        return this.demandService.closeDemand(params.id, user.id)
    }




}
