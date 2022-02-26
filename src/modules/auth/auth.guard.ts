import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

    @Inject() authService: AuthService
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
        if (!authorization) {
            throw new UnauthorizedException('Sign in failed')
        }
        return this.authService.validate({ token: authorization.split(' ')[1] })
    }
}