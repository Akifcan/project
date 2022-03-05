import { Body, Controller, Get, Inject, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { User } from '../../common/decorators/user.decorator'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { CreateEventPostDto } from './dtos/createEventPost.dto'
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

    @Post("event")
    @UseInterceptors(FilesInterceptor('files'))
    createPostAsEvent(@User() user: CurrentUserProps, @Body() createEventPostDto: CreateEventPostDto, @UploadedFiles() files: Express.Multer.File[]) {
        return this.postService.createPostAsEvent(user, createEventPostDto, files)
    }

    @Get("event/:id/participate")
    participateEvent(@User() user: CurrentUserProps, @Param() params: { id: number }) {
        return this.postService.participateEvent(user.id, params.id)
    }

    @Get("feed")
    feed(@User() user: CurrentUserProps) {
        return this.postService.feed(user.id)
    }

}
