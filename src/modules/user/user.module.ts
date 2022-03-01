import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from '../../entities/lesson.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entites/user.entity'
import UserTransformer from './user.transformer'
import { Demand } from '../demand/entities/demand.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson, Demand])],
  providers: [UserService, UserTransformer],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
