import { gql } from '@apollo/client'
import { BOOK_DETAILS } from '../fragments/index'

const ADD_BOOK = gql`
  mutation ADD_BOOK(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export default ADD_BOOK
