import { Lesson } from '../../../entities/lesson.entity'
import { User } from '../../user/entites/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from 'typeorm'
import { Comment } from '../../comment/entities/comment.entity'

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column({ nullable: true })
  validUntil: Date


  @ManyToOne(() => Lesson, (lesson) => lesson.id)
  lesson: Lesson

  @OneToMany(() => Comment, (comment) => comment.announcement)
  comments: Comment[]

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @CreateDateColumn()
  createdAt: Date
}
