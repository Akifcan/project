import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from '../../entities/lesson.entity'
import { Repository } from 'typeorm'
import { Schedule } from './entities/schedule.entity'

@Injectable()
export class ScheduleService {
    @InjectRepository(Schedule) scheduleRepository: Repository<Schedule>
    @InjectRepository(Lesson) lessonRepository: Repository<Lesson>


    scheduleOfUser(userId: number) {

        const today = 3
        // const today = new Date().getDay()

        return this.lessonRepository.createQueryBuilder("lessons")
            .leftJoinAndSelect("lessons.schedules", "schedules")
            .leftJoinAndSelect("lessons.users", "users")
            .where("users.id = :userId and schedules.day = :today", { userId, today })
            .getMany()

    }

}
