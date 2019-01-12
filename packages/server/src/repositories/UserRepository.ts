import { EntityRepository, Repository } from "typeorm"
import { User } from "../entity/User"
import { getCustomRepository } from "typeorm"

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async isUserExists(username: string, email: string) {
        const user = await this.createQueryBuilder("user")
                        .where( "user.username = :username OR user.email = :email", { username, email })
                        .getOne()
        return !!user
    }

}

export const getUserRepository = () => getCustomRepository(UserRepository)