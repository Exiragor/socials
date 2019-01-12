import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { Message } from "./Message"
import { Status } from "../types/Status"

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field({ nullable: true })
    @Column({ type: 'timestamp'})
    createdAt: Date

    @Field()
    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date

    @Field()
    @Column({ type: 'enum', enum: Status })
    status: string

    @Field()
    @Column({ unique: true })
    username: string

    @Field()
    @Column({ unique: true })
    email: string

    @Field()
    @Column({ type: 'timestamp'})
    birthDate: Date

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    nickname: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    avatar: string

    @Column()
    password: string

    @Field(() => String, { nullable: true })
    accessToken: string

    @Column({ nullable: true })
    accessSecret: string

    @Field(() => [Message], { nullable: true })
    @OneToMany(() => Message, msg => msg.user)
    messages: Message[]
}