import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs as contactsTypeDefs, resolvers as contactsResolvers } from './src/schemas/contacts'
import { typeDefs as carsTypeDefs, resolvers as carsResolvers } from './src/schemas/cars'
import { merge } from 'lodash'
import http from 'http'

const app = express()
const httpServer = http.createServer(app)

const schema = makeExecutableSchema({
  typeDefs: [contactsTypeDefs, carsTypeDefs],
  resolvers: merge(contactsResolvers, carsResolvers),
})

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

server.start().then(() => {
  server.applyMiddleware({ app })

  new Promise(resolve => httpServer.listen({ port: 4000 }, resolve)).then(() => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
})
