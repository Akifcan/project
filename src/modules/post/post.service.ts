import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import LanguageProps from '../../common/i18y/language.interface'
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
import UserTransformer from '../user/user.transformer'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class PostService {

    @Inject() private readonly fileService: FileService
    @Inject() private readonly userService: UserService
    @Inject() private readonly postTransformer: PostTransformer
    @Inject() private readonly userTransformer: UserTransformer
    @Inject() private readonly notificationService: NotificationService


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
        const { lat, long, ...rest } = createEventPostDto
        const eventPost = await this.eventPostRepository.save(this.eventPostRepository.create({
            lat: +lat,
            long: +long,
            ...rest,
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
                .where("announcementLesson.id IN(:...lessonIds) OR  posts.media.id IS NOT NULL OR posts.event.id IS NOT NULL OR posts.quoteId IS NOT NULL or announcementLesson.id = 10", { lessonIds })
                .orderBy("posts.createdAt", "DESC")
                .getMany(), userId)
    }

    async postDetail(postId: number, currentUserId: number) {
        return this.postTransformer.postToPublicEntity(await this.postBuilder()
            .where("posts.id = :postId", { postId })
            .getOne(), currentUserId)
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

    async timeline(userId: number, currentUserId: number) {
        return this.postTransformer.postsToPublicEntity(await this.postBuilder()
            .where("posts.userId = :userId ", { userId })
            .orderBy("posts.createdAt", "DESC")
            .getMany(), currentUserId)
    }

    async likedUsers(postId: number) {
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: ["likes", "likes.department"] })
        return post.likes.map(user => this.userTransformer.user(user))
    }

    private postBuilder() {
        return this.postRepository.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.likes", "likes")
            .leftJoinAndSelect("posts.user", "user")
            .leftJoinAndSelect("user.department", "userDepartment")
            .leftJoinAndSelect("posts.quote", "quote")
            .leftJoinAndSelect("quote.media", "quoteMedia")
            .leftJoinAndSelect("quoteMedia.files", "quoteMediaFiles")
            .leftJoinAndSelect("quote.event", "quoteEvent")
            .leftJoinAndSelect("quoteEvent.files", "quoteEventFiles")
            .leftJoinAndSelect("quote.announcement", "quoteAnnouncement")
            .leftJoinAndSelect("quoteAnnouncement.lesson", "quoteAnnouncementLesson")
            .leftJoinAndSelect("quoteAnnouncement.user", "quoteAnnouncementUser")
            .leftJoinAndSelect("quoteAnnouncement.files", "quoteAnnouncementFiles")
            .leftJoinAndSelect("posts.media", "media")
            .leftJoinAndSelect("media.files", "mediaFiles")
            .leftJoinAndSelect("posts.event", "event")
            .leftJoinAndSelect("event.files", "eventFiles")
            .leftJoinAndSelect("posts.announcement", "announcement")
            .leftJoinAndSelect("announcement.lesson", "announcementLesson")
            .leftJoinAndSelect("announcement.user", "announcementUser")
            .leftJoinAndSelect("announcement.files", "announcementFiles")

    }

    async participateEvent(userId: number, eventId: number, language: LanguageProps) {
        const user = await this.userRepository.findOneOrFail({ id: userId })
        const event = await this.eventPostRepository.findOneOrFail({ where: { id: eventId }, relations: ["participations"] })
        const post = await this.postRepository.findOneOrFail({ where: { event: event.id }, relations: ["user"] })

        if (event.participations.find(e => e.id === user.id)) {
            event.participations = event.participations.filter(e => e.id !== userId)
            this.notificationService.undoNotification(userId, post.user.id, post.id)
        } else {
            this.notificationService.sendPersonalNotification("post", userId, post.user.id, "Event", "Will join your event", post.id)
            event.participations.push(user)
        }

        return (await this.eventPostRepository.save(event)).participations
    }

    async participateStatus(userId: number, eventId: number) {
        const event = await this.eventPostRepository.findOneOrFail({ where: { id: eventId }, relations: ["participations"] })

        return { isParticipation: event.participations.find(user => user.id === userId) ? true : false }
    }

    async likePost(userId: number, postId: number) {
        const post = await this.postRepository.findOne({ where: { id: postId }, relations: ["likes", "user"] })

        const user = await this.userRepository.findOneOrFail({ id: userId })
        let message = ""

        if (post.likes.find(user => user.id === userId)) {
            post.likes = post.likes.filter(user => user.id !== userId)
            this.notificationService.undoNotification(userId, post.user.id, post.id)
            Logger.log("like undo")
            message = "Like removed"
        } else {
            this.notificationService.sendPersonalNotification("post", userId, post.user.id, "Like", "Liked your post", post.id)
            post.likes.push(user)
            message = "Like Added"
        }
        await this.postRepository.save(post)
        return message

    }

}
