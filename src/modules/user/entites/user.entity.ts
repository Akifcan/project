import { Lesson } from '../../../entities/lesson.entity'
import { Announcement } from '../../announcement/entities/announcement.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Comment } from '../../comment/entities/comment.entity'
import { Demand } from '../../demand/entities/demand.entity'
import { DemandConversation } from 'src/modules/demand/entities/demandConversation.entity'

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

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[]

  @OneToMany(() => Demand, (demand) => demand.openedBy)
  demands: Demand[]

  @OneToMany(() => DemandConversation, (demandConversation) => demandConversation.user)
  demandConveresations: DemandConversation[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @ManyToMany(() => Lesson)
  @JoinTable()
  lessons: Lesson[]

  @ManyToMany(() => Demand)
  @JoinTable()
  forwards: Demand[]
}
