import { User } from 'src/modules/user/entites/user.entity'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]

  @OneToMany(() => Schedule, (schedule) => schedule.lesson)
  schedules: Schedule[]

}
