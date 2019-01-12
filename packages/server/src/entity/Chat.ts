import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { Message } from "./Message"
import { Status } from "../types/Status"
import { PaginationResult } from "../types/PaginationResult"

@Entity()
@ObjectType()
export class Chat {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column({ type: 'timestamp'})
    createdAt: Date

    @Field({ nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date

    @Field()
    @Column({ type: 'enum', enum: Status })
    status: string

    @Field()
    @Column()
    name: string

    @Field({ nullable: true })
    @Column({ type: 'text'})
    description: string

    @Field({ nullable: true })
    @Column()
    picture: string

    @Field(() => [Message], { nullable: true })
    @OneToMany(() => Message, msg => msg.chat)
    messages: Message[]
}

@ObjectType()
export class ChatPaginationResult extends PaginationResult<Chat> {
    @Field(() => [Chat])
    data: Chat[]
}