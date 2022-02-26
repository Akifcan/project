import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'
import { Language } from '../../common/decorators/language.decorator'
import { Public } from '../../common/decorators/public.decorator'
import LanguageProps from '../../common/i18y/language.interface'
import { AuthService } from './auth.service'
import SignInDto from './dtos/sign-in.dto'
import ValidateDto from './dtos/validate.dto'


@Controller('auth')
export class AuthController {

    @Inject() private authService: AuthService

    @Public()
    @Post('/sign-in')
    @HttpCode(202)
    signIn(@Body() signInDto: SignInDto, @Language() language: LanguageProps) {
        return this.authService.signIn(signInDto, language)
    }

    @Public()
    @Post('/validate')
    @HttpCode(202)
    validate(@Body() validateDto: ValidateDto) {
        return this.authService.validate(validateDto)
    }
}
