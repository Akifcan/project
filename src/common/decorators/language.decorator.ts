import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Language = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const language = await require(`../../common/i18y/${request.headers['accept-language'] || 'tr'}`)

        return { tr: language.default }
    },
)