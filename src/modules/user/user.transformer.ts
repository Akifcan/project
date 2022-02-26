import { Injectable } from "@nestjs/common"
import { User } from "./entites/user.entity"

@Injectable()
class UserTransformer {

    lessons(user: User) {
        return user.lessons
    }

}

export default UserTransformer