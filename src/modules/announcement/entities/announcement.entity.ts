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
import { File } from '../../../modules/file/entities/file.entity'

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

  @OneToMany(
    () => File,
    file => file.announcements
  )
  files: File[]


  @ManyToOne(() => User, (user) => user.id)
  user: User

  @CreateDateColumn()
  createdAt: Date
}
