import {
    Resolver,
    Arg,
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
  
    @Query(() => ChatPaginationResult)
    async chatList(
        @Arg("page") page: number,
        @Arg("count") count: number,
    ) {
        let result = new ChatPaginationResult()
        result = await getPaginationResult<ChatRepository, Chat, ChatPaginationResult>(result, this._repository, page, count)
        return result
    }
}
