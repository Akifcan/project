import { Injectable } from "@nestjs/common"
import { Announcement } from "./entities/announcement.entity"

@Injectable()

export class AnnouncementTransformer {

    announcementToPublicEntity(announcements: Announcement[]) {
        return announcements.map(announcement => {

            if (!announcement.validUntil) {
                delete announcement.validUntil
            } else {
                announcement["isValid"] = new Date() > announcement.validUntil ? true : false
            }

            return announcement
        })
    }

}