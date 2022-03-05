import { File } from '../../file/entities/file.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToMany,
    JoinTable,
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

    @ManyToMany(() => File)
    @JoinTable()
    files: File[]

    @CreateDateColumn()
    createdAt: Date
}
