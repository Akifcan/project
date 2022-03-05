import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm'

import { User } from '../../user/entites/user.entity'
import { Demand } from './demand.entity'

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
        () => Demand,
        demand => demand.id
    )
    demand: Demand

    @ManyToOne(
        () => User,
        user => user.id
    )
    forwardedUser: User

}
