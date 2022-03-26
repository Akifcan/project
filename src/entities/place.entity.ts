import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'



@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    lat: string

    @Column({ unique: true })
    long: string

    @Column({ unique: true })
    addressTitle: string

    @CreateDateColumn()
    createdAt: Date

}
