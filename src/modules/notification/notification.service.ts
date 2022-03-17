import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from '../announcement/entities/announcement.entity'
import { Notification, NotificationTopic } from './entities/notification.entity'

@Injectable()
export class NotificationService {

    @InjectRepository(Announcement) readonly announcementRepository: Repository<Announcement>
    @InjectRepository(Notification) readonly notificationRepository: Repository<Notification>

    myNotifications(userId: number) {
        return this.notificationRepository.createQueryBuilder("notification")
            .leftJoinAndSelect("notification.lesson", "lesson")
            .leftJoinAndSelect("lesson.users", "lessonUsers")
            .leftJoinAndSelect("notification.sender", "sender")
            .leftJoinAndSelect("notification.receiver", "receiver")
            .where("lessonUsers.id = :userId OR sender.id = :userId", { userId })
            .getMany()
    }


    sendPersonalNotification(topic: NotificationTopic, senderId: number, receiverId: number, title: string, body: string) {
        return this.notificationRepository.save(
            this.notificationRepository.create({
                topic,
                body,
                title,
                sender: { id: senderId },
                receiver: { id: receiverId }
            })
        )
    }


    async sendAnnouncementNotification(body: string, announcementId: number, senderId: number) {
        const current = await this.announcementRepository.findOne({ where: { id: announcementId }, relations: ["lesson"] })
        return this.notificationRepository.save(
            this.notificationRepository.create({
                topic: "announcement",
                body,
                lesson: { id: current.lesson.id },
                sender: { id: senderId },
                title: "New announcement"
            })
        )

    }

}
