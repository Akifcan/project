import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'

import { User } from '../../../modules/user/entites/user.entity'

export type DemandActivityType = "opened a demand" | "close this demand" | "forward this demand" | "replied"

@Entity()
export class DemandActivity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    action: DemandActivityType

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        () => User,
        user => user.id
    )
    user: User

    @ManyToOne(
        () => User,
        user => user.id
    )
    forwardedUser: User

}
