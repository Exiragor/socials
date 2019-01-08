import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { User } from "./User"
import { Chat } from "./Chat";
import { Status } from "../types/Status";

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
    createdAt: Date

    @Field()
    @Column({ type: 'timestamp'})
    updatedAt: Date

    @Field()
    @Column({ type: 'enum', enum: Status })
    status: string

    @Field(() => User)
    @ManyToOne(() => User, user => user.messages)
    user: User

    @Field(() => Chat)
    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat
}