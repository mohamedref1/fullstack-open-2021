import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../graphql/index'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres')
  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES)
  const { loading: booksLoading, data: booksData } = useQuery(
    ALL_BOOKS,
    genre !== 'all genres'
      ? { variables: { genre } }
      : { variables: { genre: undefined } }
  )

  if (!show) {
    return null
  }

  if (booksLoading || genresLoading) {
    return <div>loading</div>
  }

  const genres = genresData.allGenres.concat('all genres')

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => {
        return (
          <button
            key={genre}
            onClick={() => {
              setGenre(genre)
            }}
          >
            {genre}
          </button>
        )
      })}
    </div>
  )
}

export default Books
