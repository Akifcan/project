import { Announcement } from '../../../modules/announcement/entities/announcement.entity'
import { User } from '../../../modules/user/entites/user.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'
import { MediaPost } from './mediaPost.entity'
import { EventPost } from './eventPost.entity'

export type PostType = "announcement" | "event" | "post"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        () => MediaPost,
        mediaPost => mediaPost.id
    )
    media: MediaPost

    @ManyToOne(
        () => MediaPost,
        mediaPost => mediaPost.id
    )
    event: EventPost



    @ManyToOne(
        () => Announcement,
        announcement => announcement.id
    )
    announcement: Announcement

    @ManyToOne(
        () => User,
        user => user.id
    )
    user: User

}
