import { gql } from '@apollo/client'

const ALL_GENRES = gql`
  query ALL_GENRES {
    allGenres
  }
`
export default ALL_GENRES
