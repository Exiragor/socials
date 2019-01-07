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
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column({ type: 'timestamp with local time zone'})
    CreatedAt: Date

    @Field()
    @Column({ type: 'timestamp with local time zone'})
    UpdatedAt: Date

    @Field()
    @Column({ unique: true })
    username: string

    @Field()
    @Column({ unique: true })
    email: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    firstname: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    lastname: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    avatar: string

    @Column()
    password: string

    @Field(() => String, { nullable: true })
    accessToken: string

    @Column({ nullable: true })
    accessSecret: string

    @OneToMany(() => Message, msg => msg.user)
    messages: Message[]
}