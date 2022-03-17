import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from './entities/announcement.entity'
import { CreateAnnouncementDto } from './dtos/createAnnouncement.dto'
import { FileService } from '../file/file.service'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { UserService } from '../user/user.service'
import { AnnouncementTransformer } from './announcement.transformer'
import { PostService } from '../post/post.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class AnnouncementService {
    @InjectRepository(Announcement) readonly announcementRepository: Repository<Announcement>


    @Inject() private readonly fileService: FileService
    @Inject() private readonly postService: PostService
    @Inject() private readonly userService: UserService
    @Inject() private readonly announcementTransformer: AnnouncementTransformer
    @Inject() private readonly notificationService: NotificationService


    cacheKey = "cache-announcements"



    async listAnnouncements(user: CurrentUserProps) {

        const lessonIds = (await this.userService.myLessons(user.id)).map(lesson => lesson.id)


        return this.announcementTransformer.announcemenstToPublicEntity(await this.announcementRepository.createQueryBuilder("announcements")
            .leftJoinAndSelect("announcements.files", "files")
            .leftJoinAndSelect("announcements.lesson", "lesson")
            .leftJoinAndSelect("announcements.user", "user")
            .where("lesson.id IN (:...lessonIds)", { lessonIds: lessonIds.length ? lessonIds : [10] })
            .orderBy("announcements.createdAt", "DESC")
            .getMany())


    }

    async listAnnouncementsByLessonId(lessonId: number) {

        return this.announcementTransformer.announcemenstToPublicEntity(await this.announcementRepository.createQueryBuilder("announcements")
            .leftJoinAndSelect("announcements.files", "files")
            .leftJoinAndSelect("announcements.lesson", "lesson")
            .leftJoinAndSelect("announcements.user", "user")
            .where("lesson.id = :lessonId", { lessonId })
            .orderBy("announcements.createdAt", "DESC")
            .getMany())


    }

    async createAnnouncement(user: CurrentUserProps, createAnnouncementDto: CreateAnnouncementDto, lessonId: number, files: Express.Multer.File[] = []) {
        try {

            const { validUntil, ...rest } = createAnnouncementDto

            const announcement = await this.announcementRepository.save(this.announcementRepository.create({ lesson: { id: +lessonId }, user: { id: user.id }, ...rest, validUntil: validUntil.length === 0 ? null : validUntil }))



            let attachements

            if (files.length) {
                attachements = await this.fileService.upload(user, files, "announcements", announcement.id)
            }

            this.notificationService.sendAnnouncementNotification(announcement.title, announcement.id, user.id)

            await this.postService.createPostAsAnnouncement(user.id, announcement.id)

            return {
                message: 'Your announcement created',
                announcement,
                attachements: attachements ? attachements : {}
            }
        } catch (e) {
            throw new BadRequestException()
        }
    }

}
