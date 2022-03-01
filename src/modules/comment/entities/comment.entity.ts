import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'

import { Announcement } from '../../announcement/entities/announcement.entity'
import { User } from '../../user/entites/user.entity'


@Entity()
export class Comment {
    @PrimaryColumn()
    id: number

    @Column()
    body: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Announcement, (announcement) => announcement.id)
    announcement: Announcement
}
