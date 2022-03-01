import { Announcement } from '../../announcement/entities/announcement.entity'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
} from 'typeorm'


@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    path: string

    @Column()
    mimeType: string

    @ManyToOne(
        () => Announcement,
        announcement => announcement.id
    )
    announcements: Announcement

    @CreateDateColumn()
    createdAt: Date
}
