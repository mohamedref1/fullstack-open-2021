import { gql } from '@apollo/client'

const ME = gql`
  query ME {
    me {
      username
      favoriteGenre
    }
  }
`

export default ME
