import { Body, Controller, Inject, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { CreateMediaPostDto } from './dtos/createMediaPost.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {

    @Inject() private readonly postService: PostService

    @Post("media")
    @UseInterceptors(FilesInterceptor('files'))
    createPostAsMedia(@User() user: CurrentUserProps, @Body() createMediaPost: CreateMediaPostDto, @UploadedFiles() files: Express.Multer.File[]) {
        return this.postService.createPostAsMedia(user, createMediaPost, files)
    }

}
