import { Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Announcement } from '../announcement/entities/announcement.entity'
import { Notification, NotificationTopic } from './entities/notification.entity'
import { NotificationTransformer } from './notification.transformer'

@Injectable()
export class NotificationService {

    @InjectRepository(Announcement) readonly announcementRepository: Repository<Announcement>
    @InjectRepository(Notification) readonly notificationRepository: Repository<Notification>

    @Inject() private readonly notificationTransformer: NotificationTransformer

    async myNotifications(userId: number) {
        return this.notificationTransformer.notificationsToPublicEntity(await
            this.notificationRepository.createQueryBuilder("notification")
                .leftJoinAndSelect("notification.lesson", "lesson")
                .leftJoinAndSelect("lesson.users", "lessonUsers")
                .leftJoinAndSelect("notification.sender", "sender")
                .leftJoinAndSelect("notification.receiver", "receiver")
                .where("lessonUsers.id = :userId OR receiver.id = :userId", { userId })
                .getMany()

        )
    }


    sendPersonalNotification(topic: NotificationTopic, senderId: number, receiverId: number, title: string, body: string, postId: number) {

        if (senderId !== receiverId) {
            return this.notificationRepository.save(
                this.notificationRepository.create({
                    topic,
                    body,
                    title,
                    post: { id: postId },
                    sender: { id: senderId },
                    receiver: { id: receiverId }
                })
            )
        } else {
            Logger.log("this post belongs same user")
        }

    }

    sendConversationNotification(topic: NotificationTopic, senderId: number, receiverId: number, title: string, body: string, conversationId: number) {
        return this.notificationRepository.save(
            this.notificationRepository.create({
                topic,
                body,
                title,
                conversation: { id: conversationId },
                sender: { id: senderId },
                receiver: { id: receiverId }
            })
        )
    }



    undoNotification(senderId: number, receiverId: number, postId: number) {
        return this.notificationRepository.delete({ sender: { id: senderId }, receiver: { id: receiverId }, post: { id: postId } })
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
