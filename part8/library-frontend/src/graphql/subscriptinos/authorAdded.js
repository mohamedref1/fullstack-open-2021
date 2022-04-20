import { gql } from '@apollo/client'
import { AUTHOR_DETAILS } from '../fragments/index'

const AUTHOR_ADDED = gql`
  subscription AUTHOR_ADDED {
    authorAdded {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export default AUTHOR_ADDED
