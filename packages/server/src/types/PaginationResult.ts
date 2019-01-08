import { ObjectType, Field } from "type-graphql"

export interface IPaginationResult<T> {
    data: T[],
    totalCount: number,
    currentPage: number,
    totalPages: number,
}

@ObjectType()
export class PaginationResult<T> implements IPaginationResult<T> {
    data: T[]

    @Field()
    totalCount: number

    @Field()
    currentPage: number

    @Field()
    totalPages: number
}
