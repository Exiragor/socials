import { EntityRepository, Repository } from "typeorm"
import { Message } from "../entity/Message"
import { getCustomRepository } from "typeorm"

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    //
}

export const getMessageRepository = () => getCustomRepository(MessageRepository)