import { IsNotEmpty } from "class-validator"

export class CreateDemandDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    content: string
}