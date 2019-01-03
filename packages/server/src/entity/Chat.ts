import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@Entity()
@ObjectType()
export class Chat {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column({ type: 'text' })
    name: string
}