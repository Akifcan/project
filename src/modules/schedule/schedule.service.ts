import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/entites/user.entity'
import { Schedule } from './entities/schedule.entity'

@Injectable()
export class ScheduleService {
    @InjectRepository(Schedule) scheduleRepository: Repository<Schedule>
    @InjectRepository(User) userRepository: Repository<User>

    scheduleOfUser(userId: number) {

        const today = 3
        // const today = new Date().getDay()

        return this.userRepository.createQueryBuilder("users")
            .select(["users.id"])
            .leftJoinAndSelect("users.lessons", "lessons")
            .leftJoinAndSelect("lessons.schedules", "schedules")
            .where("users.id = :userId", { userId })
            .where("schedules.day = :today", { today })
            .getOne()
    }

}
