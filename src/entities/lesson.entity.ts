import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'

import { Announcement } from '../modules/announcement/entities/announcement.entity'
import { Schedule } from '../modules/schedule/entities/schedule.entity'

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

  @OneToMany(() => Schedule, (schedule) => schedule.lesson)
  schedules: Schedule[]

}
