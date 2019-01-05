import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { User } from "./User"

@Entity()
@ObjectType()
export class Message {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column()
    text: string

    @Field()
    @Column({ type: 'timestamp'})
    createdAt: string

    @Field(() => User)
    @ManyToOne(() => User, user => user.messages)
    user: User
}