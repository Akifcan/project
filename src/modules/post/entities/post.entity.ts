import { Announcement } from '../../../modules/announcement/entities/announcement.entity'
import { User } from '../../../modules/user/entites/user.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm'
import { MediaPost } from './mediaPost.entity'
import { EventPost } from './eventPost.entity'
import { Comment } from '../../../modules/comment/entities/comment.entity'

export type PostType = "announcement" | "event" | "post"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => User)
    @JoinTable()
    likes: User[]

    @OneToMany(
        () => Comment,
        comment => comment.post
    )
    comments: Comment[]


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
        () => Post,
        post => post.id
    )
    quote: Post


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
