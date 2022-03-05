import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { User } from '../../../modules/user/entites/user.entity'
import { File } from '../../../modules/file/entities/file.entity'


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

    @OneToMany(
        () => File,
        file => file.id
    )
    files: File[]


    @CreateDateColumn()
    createdAt: Date
}
