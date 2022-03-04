import { Injectable } from "@nestjs/common"
import { User } from "./entites/user.entity"

@Injectable()
class UserTransformer {

    lessons(user: User) {
        return user.lessons
    }

    user(user: User) {
        return {
            id: user.id,
            name: user.name,
            profilePhoto: user.profilePhoto,
            email: user.email
        }
    }

}

export default UserTransformer