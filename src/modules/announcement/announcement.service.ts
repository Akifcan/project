import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from './entities/announcement.entity'
import { CreateAnnouncementDto } from './dtos/createAnnouncement.dto'
import { FileService } from '../file/file.service'
import CurrentUserProps from '../auth/interface/currenetUser.interface'
import { UserService } from '../user/user.service'
import { AnnouncementTransformer } from './announcement.transformer'

@Injectable()
export class AnnouncementService {
    @InjectRepository(Announcement) private readonly announcementRepository: Repository<Announcement>
    @Inject() private readonly fileService: FileService
    @Inject() private readonly userService: UserService
    @Inject() private readonly announcementTransformer: AnnouncementTransformer



    async listAnnouncements(user: CurrentUserProps) {
        const lessonIds = (await this.userService.myLessons(user.id)).map(lesson => lesson.id)

        return this.announcementTransformer.announcementToPublicEntity(await this.announcementRepository.createQueryBuilder("announcements")
            .leftJoinAndSelect("announcements.lesson", "lesson")
            .leftJoinAndSelect("announcements.user", "user")
            .where("lesson.id IN (:...lessonIds)", { lessonIds })
            .orderBy("announcements.createdAt", "DESC")
            .getMany())
    }

    async createAnnouncement(user: CurrentUserProps, createAnnouncementDto: CreateAnnouncementDto, lessonId: number, files: Express.Multer.File[] = []) {
        try {

            const announcement = await this.announcementRepository.save(this.announcementRepository.create({ lesson: { id: +lessonId }, user: { id: user.id }, ...createAnnouncementDto }))

            let attachements

            if (files.length) {
                attachements = await this.fileService.upload(user, files, "announcements", announcement.id)
            }

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
