import { Injectable } from "@nestjs/common"
import { Lesson } from "../../entities/lesson.entity"
import { User } from "./entites/user.entity"

@Injectable()
class UserTransformer {

    lessons(lessons: Lesson[]) {
        return lessons.map(lesson => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { users, ...rest } = lesson
            return rest
        })
    }

    user(user: User) {
        return {
            id: user.id,
            name: user.name,
            profilePhoto: user.profilePhoto,
            role: user.role,
            email: user.email
        }
    }

}

export default UserTransformer