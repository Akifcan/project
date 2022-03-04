import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { CreateDemandDto } from './dtos/createDemand.dto'
import { Demand } from './entities/demand.entity'

@Injectable()
export class DemandService {

    @InjectRepository(Demand) readonly demandRepository: Repository<Demand>


    createDemand(user: CurrentUserProps, createDemandDto: CreateDemandDto) {
        return this.demandRepository.save(
            this.demandRepository.create({ ...createDemandDto, openedBy: { id: user.id } })
        )
    }

    listAllDemands() {
        return this.demandRepository.find({ order: { createdAt: -1 }, relations: ["openedBy"] })
    }



}
