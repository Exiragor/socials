import {
    Resolver,
    Query,
    Ctx,
    Arg,
    Mutation,
    Authorized,
} from "type-graphql"
import { ApolloError } from "apollo-server-express"
import { User } from "../../entity/User"
import { MyContext } from "../../types/Context"
import { getUserRepository, UserRepository } from "../../repositories/UserRepository"
import { prepareRegistrationDataToSave, checkPassword, generateAccessTokenSecret } from "./helpers"
import errorsBook from "../../books/errors"
import { getAppLang } from "../../books/lang"
  
@Resolver(User)
export class UserResolver {

    private _repository: UserRepository

    constructor() {
        this._repository = getUserRepository()
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
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("birthdate") birthDate: Date,

        @Ctx() ctx: MyContext
    ) {
        let user = await this._repository.create()
        user = await prepareRegistrationDataToSave(user, { username, email, password, birthDate})
        if (await this._repository.isUserExists(user.username, user.email)) {
            const currError = errorsBook.registration.userExists
            const currLang = getAppLang(ctx)
            return new ApolloError(currError.message[currLang], currError.code)
        }

        await this._repository.save(user)

        return user.id
    }
    
    @Mutation(() => User)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string,

        @Ctx() ctx: MyContext,
    ) {
        let user: User | null = await this._repository.findOne({ username }) || null
        if (!user) {
            const currError = errorsBook.login.userInNotFfound
            const currLang = getAppLang(ctx)
            return new ApolloError(currError.message[currLang], currError.code)
        }

        const passCorrect = await checkPassword(password, user.password)
        if (!passCorrect) {
            const currError = errorsBook.login.passwordIncorrect
            const currLang = getAppLang(ctx)
            return new ApolloError(currError.message[currLang], currError.code)
        }

        user = await generateAccessTokenSecret(user)
        await this._repository.save(user)

        ctx.userLoader.load(user.id)

        return user
    }
  
    @Authorized()
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext) {
        const user = await ctx.userLoader.load(ctx.userId)
        return user || null
    }

    @Query(() => Boolean)
    async isUserExist(
        @Arg("username", { nullable: true }) username: string,
        @Arg("email", { nullable: true }) email: string,
    ) {
        if (!username) username = ""
        if (!email) email = ""
        return this._repository.isUserExists(username, email)
    }
}