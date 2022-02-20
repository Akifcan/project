import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from 'src/entities/lesson.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entites/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
