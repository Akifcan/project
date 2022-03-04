import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BeforeInsert,
    ManyToOne
} from 'typeorm'

import slugify from "slugify"
import { User } from '../../../modules/user/entites/user.entity'

@Entity()
export class Demand {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({ nullable: true })
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
        this.demandCode = slugify(this.title) + Date.now().toString().substring(0, 5)
    }
}
