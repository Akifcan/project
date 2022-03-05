import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common'
import { User } from '../../common/decorators/user.decorator'
import RoleGuard from '../../common/guards/role.guard'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

    @Inject() private userService: UserService

    @Get('/me')
    me(@User() user: CurrentUserProps) {
        return this.userService.me(user.id)
    }

    @Get("profile/:id")
    profile(@Param() params: { id: number }) {
        return this.userService.me(params.id)
    }

    @UseGuards(new RoleGuard(['student', 'teacher']))
    @Get('/me/lessons')
    lessons(@User() user: CurrentUserProps) {
        return this.userService.myLessons(user.id)
    }
}
