import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from '../../entities/lesson.entity'
import { Repository } from 'typeorm'
import { User } from './entites/user.entity'
import UserTransformer from './user.transformer'

@Injectable()
export class UserService {

    @InjectRepository(User) readonly userRepository: Repository<User>
    @InjectRepository(Lesson) readonly lessonRepository: Repository<Lesson>


    @Inject() private readonly userTransformer: UserTransformer

    findUser(email: string, password: string) {
        return this.userRepository.findOne({ email, password })
    }

    me(id: number) {
        return this.userRepository.findOne({ id })
    }

    async myLessons(id: number) {
        return this.userTransformer.lessons(await this.lessonRepository.createQueryBuilder("lessons")
            .leftJoinAndSelect("lessons.users", "users")
            .where("users.id = :id", { id })
            .getMany()

        )
    }


}
