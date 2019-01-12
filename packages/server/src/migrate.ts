import { createTypeormConn } from "./createTypeormConn"

const migrateTables = async () => {
    const dbConn = await createTypeormConn()
    if (dbConn) {
        await dbConn.runMigrations()
        await dbConn.close()
    }
}

migrateTables()