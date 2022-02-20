import { Body, Controller, Inject, Post } from '@nestjs/common'
import { Language } from 'src/common/decorators/language.decorator'
import LanguageProps from 'src/common/i18y/language.interface'
import { AuthService } from './auth.service'
import SignInDto from './dtos/sign-in.dto'

@Controller('auth')
export class AuthController {

    @Inject() private authService: AuthService

    @Post('/sign-in')
    signIn(@Body() signInDto: SignInDto, @Language() language: LanguageProps) {
        return this.authService.signIn(signInDto, language)
    }
}
