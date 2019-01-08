import {
    Resolver,
    Arg,
    Authorized,
    Query
} from "type-graphql"
import { Chat, ChatPaginationResult } from "../../entity/Chat"
import { getChatRepository, ChatRepository } from "../../repositories/ChatRepository"
import { getPaginationResult } from "../../helpers";

  
@Resolver(Chat)
export class ChatResolver {

    private _repository: ChatRepository

    constructor() {
        this._repository = getChatRepository()
    }
  
    @Authorized()
    @Query(() => ChatPaginationResult)
    async chatList(
        @Arg("page") page: number,
        @Arg("count") count: number,
    ) {
        const result = await getPaginationResult<ChatRepository, Chat>(this._repository, page, count)
        return result
    }
}
