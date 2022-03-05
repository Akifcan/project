import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { FileService } from '../file/file.service'
import { CreateEventPostDto } from './dtos/createEventPost.dto'
import { CreateMediaPostDto } from './dtos/createMediaPost.dto'
import { EventPost } from './entities/eventPost.entity'
import { MediaPost } from './entities/mediaPost.entity'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {

    @Inject() private readonly fileService: FileService

    @InjectRepository(Post) readonly postRepository: Repository<Post>
    @InjectRepository(MediaPost) readonly mediaPostRepository: Repository<MediaPost>
    @InjectRepository(EventPost) readonly eventPostRepository: Repository<EventPost>



    createPostAsAnnouncement(userId: number, announcementId: number) {
        return this.postRepository.save(this.postRepository.create({ announcement: { id: announcementId }, user: { id: userId } }))
    }

    async createPostAsMedia(user: CurrentUserProps, createMediaPostDto: CreateMediaPostDto, files: Express.Multer.File[] = []) {
        const mediaPost = await this.mediaPostRepository.save(this.mediaPostRepository.create({ ...createMediaPostDto, user: { id: user.id } }))
        let attachements

        if (files.length) {
            attachements = await this.fileService.upload(user, files, "mediaPost", mediaPost.id)
        }
        const post = await this.postRepository.save(this.postRepository.create({ user: { id: user.id }, media: { id: mediaPost.id } }))

        return {
            post,
            mediaPost,
            attachements
        }

    }

    async createPostAsEvent(user: CurrentUserProps, createEventPostDto: CreateEventPostDto, files: Express.Multer.File[] = []) {
        const eventPost = await this.eventPostRepository.save(this.eventPostRepository.create({ ...createEventPostDto, user: { id: user.id } }))
        let attachements

        if (files.length) {
            attachements = await this.fileService.upload(user, files, "eventPost", eventPost.id)
        }

        const post = await this.postRepository.save(this.postRepository.create({ user: { id: user.id }, event: { id: eventPost.id } }))

        return {
            post,
            eventPost,
            attachements
        }

    }

}
