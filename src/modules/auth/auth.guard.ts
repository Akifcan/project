import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import JwtProps from './interface/jwtProps.itnerface'

@Injectable()
export class AuthGuard implements CanActivate {

    @Inject() jwtService: JwtService
    @Inject() reflector: Reflector

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers
        const validate = this.jwtService.decode(authorization.split(' ')[1]) as JwtProps
        if (!validate) {
            throw new UnauthorizedException('Please try again')
        }
        request.currentUser = validate.id
        return true

    }
}