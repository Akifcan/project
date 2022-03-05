import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { FileService } from '../file/file.service'
import { CreateMediaPostDto } from './dtos/createMediaPost.dto'
import { MediaPost } from './entities/mediaPost.entity'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {

    @Inject() private readonly fileService: FileService

    @InjectRepository(Post) readonly postRepository: Repository<Post>
    @InjectRepository(MediaPost) readonly mediaPostRepository: Repository<MediaPost>


    createPostAsAnnouncement(userId: number, announcementId: number) {
        return this.postRepository.save(this.postRepository.create({ announcement: { id: announcementId }, user: { id: userId } }))
    }

    async createPostAsMedia(user: CurrentUserProps, createMediaPostDto: CreateMediaPostDto, files: Express.Multer.File[] = []) {
        const mediaPost = await this.mediaPostRepository.save(this.mediaPostRepository.create(createMediaPostDto))
        let attachements

        if (files.length) {
            attachements = await this.fileService.upload(user, files, "post", mediaPost.id)
        }
        const post = await this.postRepository.save(this.postRepository.create({ user: { id: user.id }, media: { id: mediaPost.id } }))

        return {
            post,
            mediaPost,
            attachements
        }

    }

}
