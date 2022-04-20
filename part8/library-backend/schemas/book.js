const { gql, UserInputError } = require('apollo-server-core')
const { pubSub } = require('../utils/pubSubSingleton')
const { flatten } = require('lodash/array')
const Book = require('../models/Book')
const Author = require('../models/Author')

const typeDef = gql`
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  extend type Query {
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
  }

  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }

  extend type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Book: {},
  Query: {
    booksCount: async () => Book.countDocuments({}),
    allBooks: async (root, args) => {
      // Get author id if author name provided
      const authorId = args.author
        ? (await Author.findOne({ name: args.author }))._id
        : null

      // generate the filter depending on the existence of author id and book genre
      let filter = {}
      authorId ? (filter.author = authorId) : null
      args.genre ? (filter.genres = { $in: [args.genre] }) : null

      const books = await Book.find(filter).populate('author')

      return books
    },
    allGenres: async () => {
      const books = await Book.find({})
      return new Set(flatten(books.map((book) => book.genres)))
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new UserInputError('Unauthorized')
      }

      if (!args.title) {
        throw new UserInputError('Book title is required')
      }

      let author = await Author.findOneAndUpdate(
        { name: args.author },
        { $inc: { booksCount: 1 } },
        { new: true }
      )
      let savedAuthor = author

      if (!author) {
        author = new Author({
          name: args.author,
          booksCount: 1,
        })

        try {
          savedAuthor = await author.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: { name: author.name },
          })
        }

        pubSub.publish('AUTHOR_ADDED', { authorAdded: savedAuthor })
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: savedAuthor._id,
        genres: args.genres,
      })
      let savedBook

      try {
        savedBook = await book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: { title: book.title },
        })
      }

      pubSub.publish('BOOK_ADDED', { bookAdded: savedBook.populate('author') })
      return savedBook.populate('author')
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = {
  typeDef,
  resolvers,
}
