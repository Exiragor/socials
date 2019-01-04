import {
    Resolver,
    Query,
    Ctx,
    Arg,
    FieldResolver,
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
        @Arg("email") email: String,
        @Arg("password") password: String,
        @Arg("firstname") firstname: String,
        @Arg("lastname") lastname: String,

        @Ctx() ctx: MyContext
    ) {
        let user = await this._repository.create()
        user = await prepareRegistrationDataToSave(user, { username, email, password, firstname, lastname})
        if (this._repository.isUserExists(user.username, user.email)) {
            const currError = errorsBook.registration.userExists
            const currLang = getAppLang(ctx)
            return new ApolloError(currError.message[currLang], currError.code)
        }

        await this._repository.save(user)

        return user.id
    }
    
    @Mutation(() => User)
    async login(
        @Arg("username") username: String,
        @Arg("password") password: String,

        @Ctx() ctx: MyContext,
    ) {
        let user: User | null = await this._repository.findOne({ username: username.toString() }) || null
        if (!user) {
            const currError = errorsBook.login.userInNotFfound
            const currLang = getAppLang(ctx)
            return new ApolloError(currError.message[currLang], currError.code)
        }
        // TODO: fix checkpass: always true
        const passCorrect = checkPassword(password.toString(), user.password)
        if (!passCorrect) {
            const currError = errorsBook.login.passwordIncorrect
            const currLang = getAppLang(ctx)
            return new ApolloError(currError.message[currLang], currError.code)
        }
        // TODO: fix problem: accessToken is empty in graph response
        user = await generateAccessTokenSecret(user)
        this._repository.save(user)
        console.log(user)
        return user
    }
  
    @Query(() => User, { nullable: true })
    async me() {
        const userId = "1"
        return userId ? await this._repository.findOne(userId) : null
    }

    @Query(() => Boolean)
    async isUserExist(
        @Arg("username") username: String,
        @Arg("email") email: String,
    ) {
        return this._repository.isUserExists(username.toString(), email.toString())
    }
}