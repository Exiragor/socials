import { getMessageRepository, MessageRepository } from "../repositories/MessageRepository"
import { getUserRepository } from "../repositories/UserRepository"
import { getChatRepository } from "../repositories/ChatRepository"
import { Message } from "../entity/Message"
import { makeSeed } from "./seeder"

export const messageSeed = async () => {
    const msgRepository = getMessageRepository()
    const userRepository = getUserRepository()
    const chatRepository = getChatRepository()
    await makeSeed<MessageRepository, Message>(msgRepository, 100, async (faker, message) => {
        message.text = faker.lorem.sentence()
        message.user = await userRepository.findOne(faker.random.number({ min: 1, max: await userRepository.count()})) || await userRepository.find()[0]
        message.chat = await chatRepository.findOne(faker.random.number({ min: 1, max: await chatRepository.count()})) || await chatRepository.find()[0]

        return message
    })
}