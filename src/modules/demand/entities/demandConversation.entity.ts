import { User } from '../../../modules/user/entites/user.entity'
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
} from 'typeorm'
import { Demand } from './demand.entity'

@Entity("demand-conversation")
export class DemandConversation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        () => Demand,
        demand => demand.id
    )
    demand: Demand

    @ManyToOne(
        () => User,
        user => user.id
    )
    user: User

}
