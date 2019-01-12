import { getChatRepository, ChatRepository } from "../repositories/ChatRepository"
import { Chat } from "../entity/Chat"
import { makeSeed } from "./seeder"

export const chatSeed = async () => {
    const repository = getChatRepository()
    await makeSeed<ChatRepository, Chat>(repository, 20, async (faker, chat) => {
        chat.name = faker.lorem.word()
        chat.description = faker.lorem.paragraph()
        chat.picture = faker.image.city()

        return chat
    })
}