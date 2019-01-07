import { EntityRepository, Repository } from "typeorm"
import { Chat } from "../entity/Chat"
import { getCustomRepository } from "typeorm"

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    //
}

export const getChatRepository = () => getCustomRepository(ChatRepository)