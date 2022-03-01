import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from './entities/announcement.entity'
import { CreateAnnouncementDto } from './dtos/createAnnouncement.dto'
import { FileService } from '../file/file.service'
import CurrentUserProps from '../auth/interface/currenetUser.interface'

@Injectable()
export class AnnouncementService {
    @InjectRepository(Announcement) private readonly announcementRepository: Repository<Announcement>
    @Inject() private readonly fileService: FileService

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
