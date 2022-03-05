import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { User } from '../user/entites/user.entity'
import UserTransformer from '../user/user.transformer'
import { CreateDemandDto } from './dtos/createDemand.dto'
import { ResponseDemandDto } from './dtos/responseDemand.dto'
import { Demand } from './entities/demand.entity'
import { DemandActivity, DemandActivityType } from './entities/demandActivity.entity'
import { DemandConversation } from './entities/demandConversation.entity'

@Injectable()
export class DemandService {

    @InjectRepository(Demand) readonly demandRepository: Repository<Demand>
    @InjectRepository(User) readonly userRepository: Repository<User>
    @InjectRepository(DemandActivity) readonly demandActivityRepository: Repository<DemandActivity>


    @InjectRepository(DemandConversation) readonly demandConversationRepository: Repository<DemandConversation>

    @Inject() private readonly userTransformer: UserTransformer

    createDemand(user: CurrentUserProps, createDemandDto: CreateDemandDto) {
        return this.demandRepository.save(
            this.demandRepository.create({ ...createDemandDto, openedBy: { id: user.id } })
        )
    }

    async forwardDemand(userId: number, demandId: number) {
        const user = await this.userRepository.findOne({ id: userId })
        const demand = await this.demandRepository.findOneOrFail({
            where: {
                id: demandId
            },
            relations: ["forwards"]
        })
        demand.forwards.push(user)
        return this.demandRepository.save(demand)
    }

    async demandDetail(demandId: number) {
        const demand = await this.demandConversationRepository.find({ where: { demand: { id: demandId } }, relations: ["user"] })
        return demand.map(demand => {
            const { user, ...rest } = demand
            return {
                ...rest,
                user: this.userTransformer.user(user)
            }
        })
    }

    responseDemand(user: CurrentUserProps, demandId: number, responseDemandDto: ResponseDemandDto) {
        return this.demandConversationRepository.save(this.demandConversationRepository.create({
            body: responseDemandDto.body,
            user: { id: user.id },
            demand: { id: demandId }
        }))
    }

    listMyDemands(userId: number) {

        return this.demandRepository.createQueryBuilder("demand")
            .leftJoinAndSelect("demand.forwards", "forwards")
            .where("demand.openedById=:userId", { userId })
            .orWhere("forwards.id=:userId", { userId })
            .getMany()

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

    private addToDemandActivity(userId: number, demandId: number, action: DemandActivityType, forwardedUserId: number = null) {
        return this.demandActivityRepository.save(this.demandActivityRepository.create({
            action,
            user: { id: userId },
            demand: { id: demandId },
            forwardedUser: { id: forwardedUserId }
        }))
    }

}
