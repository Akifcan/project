import { User } from '../../../modules/user/entites/user.entity'
import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Conversation } from './conversation.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @Column()
    body: string

    @ManyToOne(
        () => User,
        user => user.id,
        { onDelete: 'CASCADE' }
    )
    sender: User

    @ManyToOne(
        () => Conversation,
        conversation => conversation.id,
        { onDelete: 'CASCADE' }
    )
    conversation: Conversation


}
