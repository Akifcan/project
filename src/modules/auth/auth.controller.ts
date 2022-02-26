import { Body, Controller, Inject, Post } from '@nestjs/common'
import { Language } from 'src/common/decorators/language.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import LanguageProps from 'src/common/i18y/language.interface'
import { AuthService } from './auth.service'
import SignInDto from './dtos/sign-in.dto'
import ValidateDto from './dtos/validate.dto'


@Controller('auth')
export class AuthController {

    @Inject() private authService: AuthService

    @Public()
    @Post('/sign-in')
    signIn(@Body() signInDto: SignInDto, @Language() language: LanguageProps) {
        return this.authService.signIn(signInDto, language)
    }

    @Post('/validate')
    validate(@Body() validateDto: ValidateDto) {
        return this.authService.validate(validateDto)
    }
}
