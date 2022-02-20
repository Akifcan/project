import { Lesson } from 'src/entities/lesson.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

export type UserRole = 'student' | 'teacher';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  lastName: string;

  @Column()
  schollId: string;

  @Column()
  role: UserRole;

  @Column({
    default: 'default-profile-photo.jpg',
  })
  profilePhoto: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Lesson)
  @JoinColumn()
  lessons: Lesson[];
}