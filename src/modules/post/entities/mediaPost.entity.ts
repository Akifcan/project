import { File } from '../../file/entities/file.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm'


@Entity()
export class MediaPost {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @ManyToMany(() => File)
    @JoinTable()
    files: File[]

    @CreateDateColumn()
    createdAt: Date
}
