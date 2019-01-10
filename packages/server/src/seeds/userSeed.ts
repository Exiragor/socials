import { getUserRepository, UserRepository } from "../repositories/UserRepository"
import { User } from "../entity/User"
import { makeSeed } from "./seeder"
import * as bcrypt from "bcrypt"

export const userSeed = async () => {
    const repository = getUserRepository()
    await makeSeed<UserRepository, User>(repository, 20, async (faker) => {
        const user = await repository.create()

        user.username = await faker.internet.userName()
        user.email = await faker.internet.email()
        user.birthDate = await faker.date.past()
        user.avatar = await faker.internet.avatar()
        user.password = await bcrypt.hash(await faker.internet.userName(), 10)

        return user
    })
}