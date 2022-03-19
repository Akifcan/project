import { Lesson } from '../../../entities/lesson.entity'
import { User } from '../../../modules/user/entites/user.entity'
import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm'
import { Message } from './message.entity'

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @Column({ nullable: true })
    lastMessage: string

    @Column({ type: "timestamp", default: new Date() })
    lastMessageTime: Date

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


    @ManyToOne(
        () => Lesson,
        lesson => lesson.id
    )
    lesson: Lesson

    @OneToMany(
        () => Message,
        message => message.conversation
    )
    messages: Message[]


}
