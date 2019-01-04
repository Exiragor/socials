import { EntityRepository, Repository } from "typeorm"
import { User } from "../entity/User"
import { getCustomRepository } from "typeorm"

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async indByName(firstname: string, lastname: string) {
        return await this.find({ firstname, lastname })
    }

    async isUserExist(username: string, email: string) {
        const user = await this.createQueryBuilder("user")
                        .where( "user.username = :username OR user.email = :email", { username, email })
                        .getOne()
        return user && true || false
    }

}

export const getUserRepository = () => getCustomRepository(UserRepository)