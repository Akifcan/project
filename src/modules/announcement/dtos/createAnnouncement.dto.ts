import { IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator'
class CreateAnnouncementDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(70)
    title: string
    @IsNotEmpty()
    @MaxLength(255)
    content: string
    @IsOptional()
    validUntil: string
}

class CreateAnnouncementForLessonDto extends CreateAnnouncementDto {
    @IsNotEmpty()
    id: number
}

export { CreateAnnouncementForLessonDto, CreateAnnouncementDto }