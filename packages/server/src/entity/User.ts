import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

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

    @Field()
    @Column()
    password: string

    @Field(() => String, { nullable: true })
    accessToken: string

    @Column({ nullable: true })
    accessSecret: string
}