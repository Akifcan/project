
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const language = await require(`../../common/i18y/${request.headers['accept-language'] || 'tr'}`)

        let errorMessage: string

        switch (exception.message) {
            case "Bad Request":
                errorMessage = language.default.unexceptedError
                break
            default:
                errorMessage = exception.message
                break
        }

        response
            .status(status)
            .json({
                message: errorMessage,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            })
    }
}