import {
    Resolver,
    Query,
    Ctx,
} from "type-graphql"
import { MyContext } from "src/types/Context"
import { getAppLang } from "../../books/lang"
  
@Resolver()
export class LangResolver {

    @Query(() => String)
    async showCurrentAppLang(
        @Ctx() ctx: MyContext
    ) {
        return getAppLang(ctx)
    }

    @Query(() => [String])
    async showDefaultLang(@Ctx() ctx: MyContext) {
        return ctx.lang.default
    }

}