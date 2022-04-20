import { gql } from '@apollo/client'
import { BOOK_DETAILS } from '../fragments/index'

const BOOK_ADDED = gql`
  subscription BOOK_ADDED {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export default BOOK_ADDED
