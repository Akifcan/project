import { Announcement } from '../modules/announcement/entities/announcement.entity'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class Lesson {
  @PrimaryColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  code: string

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => Announcement, (announcement) => announcement.lesson)
  announcements: Announcement[]
}
