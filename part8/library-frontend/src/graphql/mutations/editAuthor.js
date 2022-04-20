import { gql } from '@apollo/client'
import { AUTHOR_DETAILS } from '../fragments/index'

const EDIT_AUTHOR = gql`
  mutation EDIT_AUTHOR($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export default EDIT_AUTHOR
