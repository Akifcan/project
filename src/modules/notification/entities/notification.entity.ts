import { Post } from '../../post/entities/post.entity'
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
} from 'typeorm'
import { Lesson } from "../../../entities/lesson.entity"
import { User } from '../../user/entites/user.entity'
import { Conversation } from '../../conversation/entities/conversation.entity'


export type NotificationTopic = "announcement" | "message" | "post"

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    topic: NotificationTopic

    @Column()
    title: string

    @Column()
    body: string

    @ManyToMany(() => User)
    readUsers: User[]

    @ManyToOne(
        () => Lesson,
        lesson => lesson.id
    )
    lesson: Lesson

    @ManyToOne(
        () => Post,
        post => post.id
    )
    post: Post

    @ManyToOne(
        () => Conversation,
        conversation => conversation.id
    )
    conversation: Post


    @ManyToOne(
        () => User,
        user => user.id
    )
    sender: User

    @ManyToOne(
        () => User,
        user => user.id
    )
    receiver: User

    @CreateDateColumn()
    createdAt: Date

}
