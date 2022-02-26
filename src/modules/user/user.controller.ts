import { Controller, Get } from '@nestjs/common'
import { User } from 'src/common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'

@Controller('user')
export class UserController {
    @Get('/me')
    me(@User() user: CurrentUserProps) {
        console.log(user)

        return "me"
    }
}
