import { Controller, Get, Inject } from '@nestjs/common'
import { User } from 'src/common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

    @Inject() private userService: UserService

    @Get('/me')
    me(@User() user: CurrentUserProps) {
        return this.userService.me(user.id)
    }

    @Get('/me/lessons')
    lessons(@User() user: CurrentUserProps) {
        return this.userService.myLessons(user.id)
    }
}
