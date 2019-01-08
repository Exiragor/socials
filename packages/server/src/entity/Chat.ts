import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { Message } from "./Message";
import { User } from "./User";

@Entity()
@ObjectType()
export class Chat {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column()
    name: string

    @Field()
    @Column({ type: 'text'})
    description: string

    @Field()
    @Column()
    picture: string

    @Field(() => [Message])
    @OneToMany(() => Message, msg => msg.chat)
    messages: Message[]

    @Field(() => [User])
    @ManyToMany(() => User, user => user.chats)
    users: User[]
}