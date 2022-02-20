import { Lesson } from 'src/entities/lesson.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

export type UserRole = 'student' | 'teacher' | 'moderator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  schollId: string

  @Column()
  role: UserRole

  @Column({ default: '12345' })
  password: string

  @Column({
    default: 'default-profile-photo.jpg',
  })
  profilePhoto: string

  @Column({ default: true })
  isActive: boolean

  @ManyToMany(() => Lesson)
  @JoinTable()
  lessons: Lesson[]
}
