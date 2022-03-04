import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BeforeInsert,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from 'typeorm'

import slugify from "slugify"
import { User } from '../../../modules/user/entites/user.entity'
import { DemandConversation } from './demandConversation.entity'

@Entity()
export class Demand {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    demandCode: string

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        () => User,
        user => user.id
    )
    openedBy: User

    @ManyToMany(() => User)
    @JoinTable()
    forwards: User[]

    @OneToMany(
        () => DemandConversation,
        demandConversation => demandConversation.demand
    )
    conversations: DemandConversation[]


    @BeforeInsert()
    generateDemandCode() {
        this.demandCode = slugify(this.title) + Date.now().toString().substring(0, 5)
    }
}
