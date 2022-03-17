import { Lesson } from '../../../entities/lesson.entity'
import { Announcement } from '../../announcement/entities/announcement.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Comment } from '../../comment/entities/comment.entity'
import { Demand } from '../../demand/entities/demand.entity'
import { DemandConversation } from '../../../modules/demand/entities/demandConversation.entity'
import { DemandActivity } from '../../../modules/demand/entities/demandActivity.entity'
import { Post } from '../../../modules/post/entities/post.entity'
import { Department } from '../../../entities/department.entity'
import { Notification } from '../../../modules/notification/entities/notification.entity'

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

  @ManyToOne(() => Department, (department) => department.id)
  department: Department


  @OneToMany(() => Demand, (demand) => demand.openedBy)
  demands: Demand[]

  @OneToMany(() => DemandConversation, (demandConversation) => demandConversation.user)
  demandConveresations: DemandConversation[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => DemandActivity, (demandActivity) => demandActivity.user)
  demandActivities: DemandActivity[]

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Notification, (notification) => notification.receiver)
  received: Notification[]

  @OneToMany(() => Notification, (notification) => notification.sender)
  sent: Notification[]


  @ManyToMany(() => Demand)
  @JoinTable()
  forwards: Demand[]
}
