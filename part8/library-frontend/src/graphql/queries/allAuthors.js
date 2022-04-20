import { gql } from '@apollo/client'
import { AUTHOR_DETAILS } from '../fragments/index'

const ALL_AUTHORS = gql`
  query ALL_AUTHORES {
    allAuthors {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export default ALL_AUTHORS
