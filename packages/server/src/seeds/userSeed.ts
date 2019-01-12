import { getUserRepository, UserRepository } from "../repositories/UserRepository"
import { User } from "../entity/User"
import { makeSeed } from "./seeder"
import * as bcrypt from "bcrypt"

export const userSeed = async () => {
    const repository = getUserRepository()
    await makeSeed<UserRepository, User>(repository, 100, async (faker, user) => {
        const username = faker.internet.userName()
        
        user.username = username
        user.email = faker.internet.email()
        user.birthDate = faker.date.past()
        user.avatar = faker.internet.avatar()
        user.password = await bcrypt.hash(username, 10)

        return user
    })
}