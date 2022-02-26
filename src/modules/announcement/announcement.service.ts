import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from './entities/announcement.entity'
import CreateAnnouncementDto from './dtos/createAnnouncement.dto'

@Injectable()
export class AnnouncementService {
    @InjectRepository(Announcement) private readonly announcementRepository: Repository<Announcement>

    async createAnnouncement(createAnnouncementDto: CreateAnnouncementDto) {
        try {
            const announcement = await this.announcementRepository.save(this.announcementRepository.create({ lesson: { id: createAnnouncementDto.id }, ...createAnnouncementDto }))
            return {
                message: 'Your announcment created',
                announcement
            }
        } catch (e) {
            throw new BadRequestException()
        }
    }

}
