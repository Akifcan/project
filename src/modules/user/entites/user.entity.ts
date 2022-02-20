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
    default: 'default-profile-photo.jpg',
  })
  profilePhoto: string;

  @Column({ default: true })
  isActive: boolean;
}
