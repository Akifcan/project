import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserRole } from 'src/modules/user/entites/user.entity'

@Injectable()
class RoleGuard implements CanActivate {

    userRoles: UserRole[]

    constructor(userRoles: UserRole[]) {
        this.userRoles = userRoles
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {


        const request = context.switchToHttp().getRequest()
        const { role } = request.currentUser
        if (!this.userRoles.includes(role)) {
            throw new UnauthorizedException()
        }
        return true

    }
}
export default RoleGuard