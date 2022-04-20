const { gql, UserInputError } = require('apollo-server-core')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/User')

const typeDef = gql`
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(username: String!, password: String!): Token
  }
`
const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    createUser: async (root, args) => {
      if (args.password.length < 7) {
        throw new UserInputError(
          'password length must be at least 7 characters',
          {
            invalidArgs: {
              password: args.password,
            },
          }
        )
      }

      const user = new User({
        username: args.username,
        passwordHash: await bcrypt.hash(args.password, 10),
        favoriteGenre: args.favoriteGenre,
      })

      let savedUser
      try {
        savedUser = await user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: { username: args.username },
        })
      }

      return savedUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const isCorrectPassword = user
        ? await bcrypt.compare(args.password, user.passwordHash)
        : false

      if (!user || !isCorrectPassword) {
        throw new UserInputError('wrong credentials', {
          invalidArgs: { username: args.username, password: args.password },
        })
      }

      const userForToken = {
        id: user._id,
        username: user.username,
      }

      const token = jwt.sign(userForToken, config.JWT_SECRET)

      return {
        value: token,
      }
    },
  },
}

module.exports = { typeDef, resolvers }
