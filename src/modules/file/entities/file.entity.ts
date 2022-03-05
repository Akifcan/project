import { Announcement } from '../../announcement/entities/announcement.entity'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
} from 'typeorm'
import { Post } from '../../../modules/post/entities/post.entity'
import { MediaPost } from '../../../modules/post/entities/mediaPost.entity'


@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    path: string

    @Column()
    mimeType: string

    @Column({ unique: true })
    ref: string


    @ManyToOne(
        () => Announcement,
        announcement => announcement.id
    )
    announcements: Announcement

    @ManyToOne(
        () => MediaPost,
        mediaPost => mediaPost.id
    )
    mediaPost: Post


    @CreateDateColumn()
    createdAt: Date
}
