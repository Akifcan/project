import { IsNotEmpty } from "class-validator"

export class ResponseDemandDto {
    @IsNotEmpty()
    body: string
}