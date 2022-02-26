import { Lesson } from '../../../entities/lesson.entity'
import { User } from '../../user/entites/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne(() => Lesson, (lesson) => lesson.id)
  lesson: Lesson

  @ManyToOne(() => User, (user) => user.id)
  user: User


  @CreateDateColumn()
  createdAt: Date
}
