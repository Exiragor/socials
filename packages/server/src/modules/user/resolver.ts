import {
    Resolver,
    Query,
    Ctx,
    Arg,
    FieldResolver,
    Mutation,
    Authorized,
} from "type-graphql"
import * as bcrypt from "bcrypt"
import { User } from "../../entity/User"
import { MyContext } from "../../types/Context"
import { getUserRepository, UserRepository } from "../../repositories/UserRepository"
  
@Resolver(User)
export class UserResolver {

    private _repository: UserRepository

    constructor() {
        this._repository = getUserRepository()
    }
  
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

    @Mutation(() => String)
    async registration(
        @Arg("username") username: String,
        @Arg("password") password: String,
        @Arg("firstname") firstname: String,
        @Arg("lastname") lastname: String,
    ) {
        const user = await this._repository.create()
        
        user.username = username.toString()
        if (firstname) user.firstname = firstname.toString()
        if (lastname) user.lastname = lastname.toString()
        user.password = await bcrypt.hash(password, 10)

        await this._repository.save(user)

        return user.id
    }
  
    @Query(() => User, { nullable: true })
    async me(
        @Ctx()
        ctx: MyContext
    ) {
        console.log(ctx.userLoader.load("1"))
        const userId = "1"
        return userId ? this._repository.findOne(userId) : null
    }
}