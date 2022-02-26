import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserRole } from 'src/modules/user/entites/user.entity'

@Injectable()
class RoleGuard implements CanActivate {

    userRole: UserRole

    constructor(userRole: UserRole) {
        this.userRole = userRole
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {


        const request = context.switchToHttp().getRequest()
        const { role } = request.currentUser
        if (this.userRole !== role) {
            throw new UnauthorizedException()
        }
        return true

    }
}
export default RoleGuard