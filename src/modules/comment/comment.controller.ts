import { Body, Controller, Inject, Post } from '@nestjs/common'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { CommentService } from './comment.service'
import { CommentDto, CommentRelationDto } from './dtos/comment.dto'

@Controller('comment')
export class CommentController {

    @Inject() private readonly commentService: CommentService

    @Post("/create")
    createComment(@User() user: CurrentUserProps, @Body() createCommentDto: CommentDto) {
        return this.commentService.createComment(user.id, createCommentDto, createCommentDto.relation)
    }

    @Post("/list")
    listComments(@Body() commentRelationDto: CommentRelationDto) {
        return this.commentService.listComments(commentRelationDto.relation)
    }


}
