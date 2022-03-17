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


export type NotificationTopic = "announcement" | "message"

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
