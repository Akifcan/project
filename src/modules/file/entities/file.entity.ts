import { Announcement } from '../../announcement/entities/announcement.entity'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
} from 'typeorm'
import { MediaPost } from '../../../modules/post/entities/mediaPost.entity'
import { EventPost } from '../../../modules/post/entities/eventPost.entity'


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
    mediaPost: MediaPost

    @ManyToOne(
        () => EventPost,
        eventPost => eventPost.id
    )
    eventPost: EventPost


    @CreateDateColumn()
    createdAt: Date
}
