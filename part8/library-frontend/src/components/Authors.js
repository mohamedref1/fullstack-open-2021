import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../graphql/index'

const Authors = ({ show, loggedIn, notify }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: { query: ALL_AUTHORS },
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const updateAuthor = (e) => {
    e.preventDefault()
    editAuthor({
      variables: { name, setBornTo: Number(born) },
      onError: (err) => {
        notify(err.clientErrors[0].message, 'error')
      },
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loggedIn ? (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={updateAuthor}>
            name{' '}
            <select
              value={name}
              onChange={({ target }) => {
                setName(target.value)
              }}
            >
              <option value="" disabled>
                select
              </option>
              {data.allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <div>
              born{' '}
              <input
                type="number"
                onChange={({ target }) => {
                  setBorn(target.value)
                }}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default Authors
