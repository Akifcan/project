import { Injectable } from "@nestjs/common"
import { Notification } from "./entities/notification.entity"

@Injectable()
export class NotificationTransformer {

    notificationsToPublicEntity(notificaitons: Notification[]) {
        return notificaitons.map(notificaiton => {
            const { body, ...rest } = notificaiton

            return {
                body: rest.topic != "announcement" ? rest.sender.name + "-" + body : body,
                ...rest
            }
        })
    }

}