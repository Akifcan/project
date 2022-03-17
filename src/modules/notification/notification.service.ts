import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from '../announcement/entities/announcement.entity'
import { Notification } from './entities/notification.entity'

@Injectable()
export class NotificationService {

    @InjectRepository(Announcement) readonly announcementRepository: Repository<Announcement>
    @InjectRepository(Notification) readonly notificationRepository: Repository<Notification>


    async sendAnnouncementNotification(announcementId: number) {
        const current = await this.announcementRepository.findOne({ where: { id: announcementId }, relations: ["lesson"] })
        return current

    }

}
