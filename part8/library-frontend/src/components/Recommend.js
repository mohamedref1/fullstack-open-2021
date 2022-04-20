import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../graphql/index'

const Recommend = ({ show }) => {
  const meResult = useQuery(ME)

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: meResult.data?.me?.favoriteGenre },
    fetchPolicy: 'network-only',
  })

  if (meResult.loading || booksResult.loading) {
    return <div>loading</div>
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre{' '}
        <strong>{meResult.data?.me?.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
