import { Lesson } from '../../../entities/lesson.entity'
import { User } from '../../../modules/user/entites/user.entity'
import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
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

    @Column()
    body: string

    @ManyToMany(() => User)
    @JoinTable()
    users: User[]

    @ManyToOne(
        () => Lesson,
        lesson => lesson.id
    )
    lessons: Lesson

    @OneToMany(
        () => Message,
        message => message.id
    )
    messages: Message[]
}
