import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entites/user.entity'

@Injectable()
export class UserService {

    @InjectRepository(User) private userRepository: Repository<User>

    findUser(email: string, password: string) {
        return this.userRepository.findOne({ email, password })
    }

}
