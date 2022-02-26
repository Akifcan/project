import { Controller, Get, Req } from '@nestjs/common'

@Controller('user')
export class UserController {
    @Get('/me')
    me(@Req() req) {
        console.log(req.currentUser)

        return "me"
    }
}
