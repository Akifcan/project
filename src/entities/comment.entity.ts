import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'

import { Announcement } from '../modules/announcement/entities/announcement.entity'
import { User } from '../modules/user/entites/user.entity'


@Entity()
export class Comment {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Announcement, (announcement) => announcement.id)
    announcement: Announcement
}
