import { Lesson } from '../../../entities/lesson.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { User } from 'src/modules/user/entites/user.entity'


@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => Lesson,
        lesson => lesson.id,
    )
    lesson: Lesson

    @Column()
    day: number

    @Column({ type: "time" })
    startAt: string

    @Column({ type: "time" })
    endAt: string

    @Column()
    place: string

    @CreateDateColumn()
    createdAt: Date
}
