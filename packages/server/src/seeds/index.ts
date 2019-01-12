import { userSeed } from "./userSeed"
import { messageSeed } from "./messageSeed"
import { chatSeed } from "./chatSeed"

const seeds = [userSeed, chatSeed, messageSeed]

export const runSeeds = async () => {
    for (let seed of seeds) {
        await seed()
    }
}