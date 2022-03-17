import { User } from '../../../modules/user/entites/user.entity'
import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'
import { Conversation } from './conversation.entity'

@Entity()
export class Message {
    @PrimaryColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @Column()
    body: string

    @ManyToOne(
        () => User,
        user => user.id
    )
    sender: User

    @ManyToOne(
        () => Conversation,
        conversation => conversation.id
    )
    conversation: Conversation
}
