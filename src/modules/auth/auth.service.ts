import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import LanguageProps from 'src/common/i18y/language.interface'
import { UserService } from '../user/user.service'
import SignInDto from './dtos/sign-in.dto'

@Injectable()
export class AuthService {

    @Inject() private userService: UserService

    async signIn(signInDto: SignInDto, language: LanguageProps) {
        const user = await this.userService.findUser(signInDto.email, signInDto.password)
        if (!user) {
            throw new UnauthorizedException(language.tr.userNotFound(signInDto.email))
        }
        return user
    }

}
