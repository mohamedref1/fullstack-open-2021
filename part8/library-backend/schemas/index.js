const { makeExecutableSchema } = require('@graphql-tools/schema')
const { gql } = require('apollo-server-core')
const { merge } = require('lodash')
const { typeDef: User, resolvers: userResolvers } = require('./user')
const { typeDef: Book, resolvers: bookResolvers } = require('./book')
const { typeDef: Author, resolvers: authorResolvers } = require('./author')

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [Query, User, Book, Author],
  resolvers: merge(resolvers, userResolvers, bookResolvers, authorResolvers),
})

module.exports = schema
