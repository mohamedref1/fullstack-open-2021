import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    id
    title
    published
    genres
    author {
      id
      name
      born
      booksCount
    }
  }
`

export default BOOK_DETAILS
