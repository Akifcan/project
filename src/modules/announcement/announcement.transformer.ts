import { Injectable } from "@nestjs/common"
import { Announcement } from "./entities/announcement.entity"

@Injectable()

export class AnnouncementTransformer {

    announcemenstToPublicEntity(announcements: Announcement[]) {
        return announcements.map(announcement => this.announcementToPublicEntity(announcement))
    }

    announcementToPublicEntity(announcement: Announcement) {
        if (!announcement.validUntil) {
            delete announcement.validUntil
        } else {
            announcement["isValid"] = new Date() > announcement.validUntil ? true : false
        }

        return announcement

    }

}