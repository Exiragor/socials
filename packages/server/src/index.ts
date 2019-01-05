import { ApolloServer, ApolloError } from "apollo-server-express"
import { GraphQLError } from "graphql"
import * as express from "express"
import { buildSchema } from "type-graphql"
import * as cors from "cors"
import { createTypeormConn } from "./createTypeormConn"
import { userLoader } from "./loaders/userLoader"
import lang from "./books/lang"
import { validateToken } from "./modules/token/helpers"

const startServer = async () => {
  const dbConn = await createTypeormConn()
  if (dbConn) {
    await dbConn.runMigrations()
  }

  const app = express()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
      authChecker: async ({ context }) => {
        const token =  context.req.headers && context.req.headers.authorization || false
        const tokenInfo = await validateToken(token)

        if (!tokenInfo) {
          return false
        }
        
        const { id, secret } = tokenInfo
        const user = await context.userLoader.load(id)

        if (user.accessSecret !== secret) {
          return false
        }

        context.userId = id
        return true
      },
    }),
    context: ({ req }: any) => ({
      req,
      userId: null,
      lang,
      userLoader: userLoader()
    }),
    formatError: (error: GraphQLError) => {
      return error
    },
  })

  app.set("trust proxy", 1)

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  )

  server.applyMiddleware({ app, cors: false }) // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()