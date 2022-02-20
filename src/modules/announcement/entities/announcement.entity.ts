import { Lesson } from 'src/entities/lesson.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.id)
  lesson: Lesson;

  @CreateDateColumn()
  createdAt: Date;
}
