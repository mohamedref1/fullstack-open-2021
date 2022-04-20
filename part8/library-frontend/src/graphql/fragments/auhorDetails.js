import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment authorDetails on Author {
    id
    name
    born
    booksCount
  }
`

export default AUTHOR_DETAILS
