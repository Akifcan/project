import { User } from '../modules/user/entites/user.entity'
import {
    Entity,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'



@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    nameTr: string

    @Column({ unique: true })
    nameEn: string

    @OneToMany(
        () => User,
        user => user.department
    )
    users: User[]

    @CreateDateColumn()
    createdAt: Date

}
