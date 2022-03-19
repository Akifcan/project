import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from '../../entities/lesson.entity'
import { Repository } from 'typeorm'
import { User } from './entites/user.entity'
import UserTransformer from './user.transformer'
import { FileService } from '../file/file.service'
import CurrentUserProps from '../auth/interface/currenetUser.interface'

@Injectable()
export class UserService {

    @InjectRepository(User) readonly userRepository: Repository<User>
    @InjectRepository(Lesson) readonly lessonRepository: Repository<Lesson>

    @Inject() private readonly fileService: FileService


    @Inject() private readonly userTransformer: UserTransformer

    findUser(email: string, password: string) {
        return this.userRepository.findOne({ email, password })
    }

    me(id: number) {
        return this.userRepository.findOneOrFail({ where: { id }, relations: ["department"] })
    }

    async myLessons(id: number) {
        return this.userTransformer.lessons(await this.lessonRepository.createQueryBuilder("lessons")
            .leftJoinAndSelect("lessons.users", "users")
            .where("users.id = :id", { id })
            .getMany()

        )
    }

    async rosters(lessonId: number) {
        const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, relations: ["users"] })
        return { rosters: lesson.users.length }
    }

    async rostersUser(lessonId: number) {
        const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, relations: ["users"] })
        return { users: lesson.users }
    }

    async updateProfilePhoto(user: CurrentUserProps, photo: Express.Multer.File) {
        const profilePhoto = await this.fileService.uploadAndGetDownloadUrl(user, photo, "profilePhoto")
        await this.userRepository.update({ id: user.id }, { profilePhoto: profilePhoto.path })
        return profilePhoto
    }


}
