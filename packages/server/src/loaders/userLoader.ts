import * as DataLoader from "dataloader"
import { getUserRepository } from "../repositories/UserRepository"
import { User } from "src/entity/User"

export const userLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const users = await getUserRepository().findByIds(keys)

    const userMap: { [key: string]: User } = {}

    users.forEach(u => {
      userMap[u.id] = u
    });

    // O(n) * O(1)
    return keys.map(k => userMap[k])
})