import { ApolloServer, ApolloError } from "apollo-server-express"
import { GraphQLError } from "graphql"
import * as express from "express"
import { buildSchema } from "type-graphql"
import * as cors from "cors"
import { createTypeormConn } from "./createTypeormConn"
import { userLoader } from "./loaders/userLoader"
import lang from "./books/lang"

const startServer = async () => {
  const dbConn = await createTypeormConn()
  if (dbConn) {
    await dbConn.runMigrations()
  }

  const app = express()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
      authChecker: ({ context }) => {
        return context.req.headers && context.req.headers.authorization // or false if access denied
      },
    }),
    context: ({ req, res }: any) => ({
      req,
      res,
      lang,
      userLoader: userLoader()
    }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error
      }

      return new GraphQLError(`Internal Error`)
    },
  })

  app.set("trust proxy", 1)

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  )

//   app.use((req, _, next) => {
//     const authorization = req.headers.authorization;

//     if (authorization) {
//       try {
//         const qid = authorization.split(" ")[1];
//         req.headers.cookie = `qid=${qid}`;
//       } catch (_) {}
//     }

//     return next();
//   });


  server.applyMiddleware({ app, cors: false }) // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()