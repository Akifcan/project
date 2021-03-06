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

    async createDemand(user: CurrentUserProps, createDemandDto: CreateDemandDto) {
        const demand = await this.demandRepository.save(
            this.demandRepository.create({ ...createDemandDto, openedBy: { id: user.id } })
        )
        this.addToDemandActivity(user.id, demand.id, "opened a demand")
        return demand
    }

    async forwardDemand(forwardUserId: number, demandId: number, userId: number) {
        this.addToDemandActivity(userId, demandId, "forward this demand", forwardUserId)

        const user = await this.userRepository.findOne({ id: forwardUserId })
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
        this.addToDemandActivity(user.id, demandId, "replied")

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

    closeDemand(demandId: number, userId: number) {
        this.addToDemandActivity(userId, demandId, "closed this demand")
        return this.demandRepository.update({ id: demandId }, { isActive: false })
    }

    removeDemand(demandId: number) {
        return this.demandRepository.delete({ id: demandId })
    }

    async demandActivities(demandId: number) {
        const demandActivities = await this.demandActivityRepository.find({ where: { demand: { id: demandId } }, relations: ["user", "forwardedUser"] })
        return demandActivities.map(activity => {

            const { user, forwardedUser, ...rest } = activity
            return { ...rest, user: this.userTransformer.user(user), forwardedUser: forwardedUser ? this.userTransformer.user(forwardedUser) : null }
        })
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
