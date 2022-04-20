import { gql } from '@apollo/client'
import { BOOK_DETAILS } from '../fragments/index'

const ALL_BOOKS = gql`
  query ALL_BOOKS($genre: String) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`
export default ALL_BOOKS
