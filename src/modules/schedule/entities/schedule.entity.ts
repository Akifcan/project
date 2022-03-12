import { Lesson } from '../../../entities/lesson.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
} from 'typeorm'


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
