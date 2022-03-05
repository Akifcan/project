import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
} from 'typeorm'
import { User } from '../../../modules/user/entites/user.entity'


@Entity()
export class MediaPost {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @ManyToOne(
        () => User,
        user => user.id
    )
    user: User

    @CreateDateColumn()
    createdAt: Date
}
