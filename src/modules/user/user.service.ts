import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entites/user.entity'
import UserTransformer from './user.transformer'

@Injectable()
export class UserService {

    @InjectRepository(User) readonly userRepository: Repository<User>
    @Inject() private readonly userTransformer: UserTransformer

    findUser(email: string, password: string) {
        return this.userRepository.findOne({ email, password })
    }

    me(id: number) {
        return this.userRepository.findOne({ id })
    }

    async myLessons(id: number) {
        return this.userTransformer.lessons(await this.userRepository.findOne({ where: { id }, relations: ['lessons'] }))
    }

}
