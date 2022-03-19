import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from '../../entities/lesson.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entites/user.entity'
import UserTransformer from './user.transformer'
import { FileModule } from '../file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson]), FileModule],
  providers: [UserService, UserTransformer],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
