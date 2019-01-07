import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { Message } from "./Message";

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
}