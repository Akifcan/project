import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BeforeInsert,
    ManyToOne
} from 'typeorm'

import slug from "slug"
import { User } from '../../../modules/user/entites/user.entity'

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

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        () => User,
        user => user.id
    )
    openedBy: User

    @BeforeInsert()
    generateDemandCode() {
        this.demandCode = slug(this.title) + Date.now().toString().substring(0, 5)
    }
}
