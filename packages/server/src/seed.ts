import { createTypeormConn } from "./createTypeormConn"
import { runSeeds } from "./seeds"

const makeSeeds = async () => {
    const dbConn = await createTypeormConn()
    if (dbConn) {
          await runSeeds()
          await dbConn.close()
      }
}

makeSeeds()