import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import CurrentUserProps from 'src/modules/auth/interface/currenetUser.interface'

export const User = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as CurrentUserProps
        return request.currentUser
    },
)