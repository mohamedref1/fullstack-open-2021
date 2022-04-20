const { gql, UserInputError } = require('apollo-server-core')
const { pubSub } = require('../utils/pubSubSingleton')
const Author = require('../models/Author')

const typeDef = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    booksCount: Int!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  extend type Subscription {
    authorAdded: Author!
  }
`

const resolvers = {
  Query: {
    authorCount: async () => Author.countDocuments({}),
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new UserInputError('Unauthorized')
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )

      return author
    },
  },
  Subscription: {
    authorAdded: {
      subscribe: () => pubSub.asyncIterator('AUTHOR_ADDED'),
    },
  },
}

module.exports = {
  typeDef,
  resolvers,
}
