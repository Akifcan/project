import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import LanguageProps from 'src/common/i18y/language.interface'
import { UserService } from '../user/user.service'
import SignInDto from './dtos/sign-in.dto'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {

    @Inject() private userService: UserService
    @Inject() private jwtService: JwtService


    async signIn(signInDto: SignInDto, language: LanguageProps) {
        const user = await this.userService.findUser(signInDto.email, signInDto.password)
        if (!user) {
            throw new UnauthorizedException(language.tr.userNotFound(signInDto.email))
        }
        return this.jwtService.sign({ id: user.id })
    }

}
