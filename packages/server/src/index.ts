import { ApolloServer } from "apollo-server-express"
import { GraphQLError } from "graphql"
import * as express from "express"
import * as http from 'http';
import { buildSchema } from "type-graphql"
import * as cors from "cors"
import { createTypeormConn } from "./createTypeormConn"
import { userLoader } from "./loaders/userLoader"
import lang from "./books/lang"
import { validateToken } from "./modules/token/helpers"
import * as conf from "config"
import { runSeeds } from "./seeds";

const startServer = async () => {
  const dbConn = await createTypeormConn()
  if (dbConn) {
    // usefull for dev
    const mode = conf.get("mode")
    if (mode == 'dev') {
      await dbConn.runMigrations()
      await runSeeds()
    } else {
      await dbConn.runMigrations()
    }
  }

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
      authChecker: async ({ context }) => {
        const token =  context.req && context.req.headers && context.req.headers.authorization || context.connAuth || ""
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
    context: ({ req, connection }: any) => ({
      req,
      userId: null,
      lang,
      userLoader: userLoader(),
      connAuth: connection && connection.context.authorization || null
    }),
    formatError: (error: GraphQLError) => {
      return error
    },
    subscriptions: {
      onConnect: (connectionParams: any, _) => {
        return {
          authorization: connectionParams.authorization || null
        }
      }
    }
  })

  app.set("trust proxy", 1)

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  )
  
  server.applyMiddleware({ app, cors: false }) // app is from an existing express app
  server.installSubscriptionHandlers(httpServer) // use another server for subscriptions

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
  
  httpServer.listen({ port: 8000 }, () => {
    console.log(`🚀 Subs server ready at http://localhost:8000${server.graphqlPath}`);
  });
}

startServer()