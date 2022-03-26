import { User } from '../modules/user/entites/user.entity'
import {
    Entity,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'
import { Place } from './place.entity'



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

    @ManyToOne(
        () => Place,
        place => place.id
    )
    place: Place


    @CreateDateColumn()
    createdAt: Date

}
