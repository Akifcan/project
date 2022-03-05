import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { User } from '../../../modules/user/entites/user.entity'
import { File } from '../../../modules/file/entities/file.entity'


@Entity()
export class EventPost {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ type: Date })
    startDate: Date

    @Column({ type: Date })
    endDate: Date

    @Column()
    body: string

    @ManyToOne(
        () => User,
        user => user.id
    )
    user: User

    @ManyToMany(() => User)
    @JoinTable()
    participations: User[]

    @OneToMany(
        () => File,
        file => file.eventPost
    )
    files: File[]


    @CreateDateColumn()
    createdAt: Date
}
