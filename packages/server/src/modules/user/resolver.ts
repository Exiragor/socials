import {
    Resolver,
    Query,
    Ctx,
    FieldResolver,
    Mutation,
    Authorized,
  } from "type-graphql"
  import { User } from "../../entity/User"
  import { MyContext } from "../../types/Context"
  import { getUserRepository } from "../../repositories/UserRepository"
  
  @Resolver(User)
  export class UserResolver {
    constructor() {}
  
    @FieldResolver()
    accessToken(@Ctx() ctx: MyContext) {
        return ctx.req.headers.authorization || ''
    }
  
    @Authorized()
    @Mutation(() => Boolean)
    logout(
      @Ctx()
      ctx: MyContext
    ) {
        console.log(ctx.req.headers.authorization)
        return true
    }
  
    @Query(() => User, { nullable: true })
    async me(
        @Ctx()
        ctx: MyContext
    ) {
        console.log(ctx.userLoader.load("1"))
        const userId = "1"
        return userId ? getUserRepository().findOne(userId) : null
    }
  }