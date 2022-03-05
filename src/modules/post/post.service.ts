import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { FileService } from '../file/file.service'
import { User } from '../user/entites/user.entity'
import { UserService } from '../user/user.service'
import { CreateEventPostDto } from './dtos/createEventPost.dto'
import { CreateMediaPostDto } from './dtos/createMediaPost.dto'
import { EventPost } from './entities/eventPost.entity'
import { MediaPost } from './entities/mediaPost.entity'
import { Post } from './entities/post.entity'
import { PostTransformer } from './post.transformer'

@Injectable()
export class PostService {

    @Inject() private readonly fileService: FileService
    @Inject() private readonly userService: UserService
    @Inject() private readonly postTransformer: PostTransformer

    @InjectRepository(Post) readonly postRepository: Repository<Post>
    @InjectRepository(User) readonly userRepository: Repository<User>
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

        const eventPost = await this.eventPostRepository.save(this.eventPostRepository.create({
            ...createEventPostDto,
            user: { id: user.id },
            participations: [{ id: user.id }]
        }))
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

    async feed(userId: number) {
        const lessonIds = (await this.userService.myLessons(userId)).map(lesson => lesson.id)
        return this.postTransformer.postsToPublicEntity(
            await this.postBuilder()
                .leftJoinAndSelect("announcement.lesson", "announcementLesson")
                .where("announcementLesson.id IN(:...lessonIds) OR  posts.media.id IS NOT NULL OR posts.event.id IS NOT NULL OR posts.quoteId IS NOT NULL", { lessonIds })
                .orderBy("posts.createdAt", "DESC")
                .getMany())
    }

    async postDetail(postId: number) {
        return await this.postRepository.findOne({ id: postId })
    }

    async quote(postId: number, userId: number) {
        const post = await this.postRepository.findOne({ id: postId })
        return this.postRepository.save(
            this.postRepository.create({
                user: { id: userId },
                quote: post
            })
        )
    }

    async timeline(userId: number) {
        return this.postTransformer.postsToPublicEntity(await this.postBuilder()
            .where("posts.userId = :userId ", { userId })
            .orderBy("posts.createdAt", "DESC")
            .getMany())

    }

    private postBuilder() {
        return this.postRepository.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.user", "user")
            .leftJoinAndSelect("posts.quote", "quote")
            .leftJoinAndSelect("quote.media", "quoteMedia")
            .leftJoinAndSelect("quoteMedia.files", "quoteMediaFiles")
            .leftJoinAndSelect("quote.event", "quoteEvent")
            .leftJoinAndSelect("quoteEvent.files", "quoteEventFiles")
            .leftJoinAndSelect("quote.announcement", "quoteAnnouncement")
            .leftJoinAndSelect("quoteAnnouncement.files", "quoteAnnouncementFiles")
            .leftJoinAndSelect("posts.media", "media")
            .leftJoinAndSelect("media.files", "mediaFiles")
            .leftJoinAndSelect("posts.event", "event")
            .leftJoinAndSelect("event.files", "eventFiles")
            .leftJoinAndSelect("posts.announcement", "announcement")
            .leftJoinAndSelect("announcement.files", "announcementFiles")

    }

    async participateEvent(userId: number, eventId: number) {
        const user = await this.userRepository.findOneOrFail({ id: userId })
        const event = await this.eventPostRepository.findOneOrFail({ where: { id: eventId }, relations: ["participations"] })
        event.participations.push(user)
        return (await this.eventPostRepository.save(event)).participations
    }

    async likePost(userId: number, postId: number) {
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: ["likes"] })
        const user = await this.userRepository.findOneOrFail({ id: userId })
        let message = ""

        if (post.likes.find(user => user.id === userId)) {
            post.likes = post.likes.filter(user => user.id !== userId)
            message = "Like removed"
        } else {
            post.likes.push(user)
            message = "Like Added"
        }
        await this.postRepository.save(post)
        return message

    }

}
