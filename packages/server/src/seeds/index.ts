import { userSeed } from "./userSeed"

const seeds = [userSeed]

export const runSeeds = async () => {
    for (let seed of seeds) {
        await seed()
    }
}