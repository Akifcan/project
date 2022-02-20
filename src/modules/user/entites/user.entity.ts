import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    default:
      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
  })
  profilePhoto: string;

  @Column({ default: true })
  isActive: boolean;
}
