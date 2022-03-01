import { IsNotEmpty, IsObject } from "class-validator"

export class CommentRelationDto {
    @IsNotEmpty()
    @IsObject()
    relation: Record<string, any>
}

export class CommentDto extends CommentRelationDto {
    @IsNotEmpty()
    body: string
}

