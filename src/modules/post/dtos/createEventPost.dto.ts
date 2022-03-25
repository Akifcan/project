import { IsNotEmpty, MaxLength, IsDateString } from "class-validator"

export class CreateEventPostDto {

    @IsNotEmpty()
    @MaxLength(20)
    title: string

    @IsNotEmpty()
    @MaxLength(255)
    body: string

    @IsNotEmpty()
    @IsDateString()
    startDate: Date

    @IsNotEmpty()
    @IsDateString()
    endDate: Date

    @IsNotEmpty()
    addressTitle: string

    @IsNotEmpty()
    addressDescription: string

    @IsNotEmpty()
    lat: string

    @IsNotEmpty()
    long: string



}