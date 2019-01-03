import { EntityRepository, Repository } from "typeorm"
import { User } from "../entity/User"
import { getCustomRepository } from "typeorm"

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(firstname: string, lastname: string) {
        return this.find({ firstname, lastname })
    }

}

export const getUserRepository = () => getCustomRepository(UserRepository)