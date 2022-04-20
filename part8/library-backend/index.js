const http = require('http')
const express = require('express')
const { ApolloServer, UserInputError } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const logger = require('./utils/logger')
const config = require('./utils/config')
const schema = require('./schemas/index')
const User = require('./models/User')

// Connecting to Database
logger.info('Connecting to MongoDB')
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB', error.message)
  })

const start = async () => {
  // Initialize http express server app
  const app = express()
  const httpServer = http.createServer(app)

  // Initialize graphql subscription webSocket server
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: '' }
  )

  // Initialize graphql http server
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        let token
        try {
          token = jwt.verify(auth.substring(7), config.JWT_SECRET)
        } catch (err) {
          throw new UserInputError('invalid token', { invalidArgs: {} })
        }

        const currentUser = await User.findById(token.id)
        return {
          currentUser,
        }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  // Run Server
  httpServer.listen(config.PORT, () => {
    logger.info(`Server is running on port: ${config.PORT}`)
  })
}

start()
