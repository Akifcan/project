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
        return this.userRepository.createQueryBuilder("users")
            .where("users.id = :userId", { userId })
            .leftJoinAndSelect("users.lessons", "lessons")
            .leftJoinAndSelect("lessons.schedules", "schedules")
            .getOne()
    }

}
