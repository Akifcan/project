import { Announcement } from 'src/modules/announcement/entities/announcement.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'
import { MediaPost } from './mediaPost.entity'

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
        () => Announcement,
        announcement => announcement.id
    )
    announcement: Announcement
}
