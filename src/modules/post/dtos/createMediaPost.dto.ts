import { IsNotEmpty, MaxLength } from "class-validator"

export class CreateMediaPostDto {

    @IsNotEmpty()
    @MaxLength(255)
    body: string

}