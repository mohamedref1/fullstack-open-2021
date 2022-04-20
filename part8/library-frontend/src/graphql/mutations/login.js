import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation LOGIN($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export default LOGIN
