import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { CreateDemandDto } from './dtos/createDemand.dto'
import { ResponseDemandDto } from './dtos/responseDemand.dto'
import { Demand } from './entities/demand.entity'
import { DemandConversation } from './entities/demandConversation.entity'

@Injectable()
export class DemandService {

    @InjectRepository(Demand) readonly demandRepository: Repository<Demand>
    @InjectRepository(DemandConversation) readonly demandConversationRepository: Repository<DemandConversation>



    createDemand(user: CurrentUserProps, createDemandDto: CreateDemandDto) {
        return this.demandRepository.save(
            this.demandRepository.create({ ...createDemandDto, openedBy: { id: user.id } })
        )
    }

    responseDemand(user: CurrentUserProps, responseDemandDto: ResponseDemandDto) {
        return this.demandConversationRepository.save(this.demandConversationRepository.create({
            body: responseDemandDto.body,
        }))
    }

    listMyDemands(userId: number) {
        return this.demandRepository.find({ openedBy: { id: userId } })
    }

    listAllDemands() {
        return this.demandRepository.find({ order: { createdAt: -1 }, relations: ["openedBy"] })
    }

    closeDemand(demandId: number) {
        return this.demandRepository.update({ id: demandId }, { isActive: false })
    }

    removeDemand(demandId: number) {
        return this.demandRepository.delete({ id: demandId })
    }



}
