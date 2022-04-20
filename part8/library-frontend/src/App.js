import { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommend from './components/Recommend'
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  ALL_GENRES,
  AUTHOR_ADDED,
  BOOK_ADDED,
} from './graphql'

// function that takes care of manipulating allBooks scache
const updateAllBooksCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [level, setLevel] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('loggedin-user-token')
    if (token) {
      setToken(token)
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`book added: ${addedBook.title}`, 'info')
      updateAllBooksCache(client.cache, { query: ALL_BOOKS }, addedBook)
      client.refetchQueries({
        include: [ALL_GENRES],
      })
    },
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(addedAuthor),
        }
      })
    },
  })

  const notify = (message, level) => {
    setMessage(message)
    setLevel(level)
    setTimeout(() => {
      setMessage(null)
      setLevel(null)
    }, 5000)
  }

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    notify('logged out successfully', 'info')
  }

  return (
    <div>
      <Notification message={message} level={level} />

      <Navbar loggedIn={Boolean(token)} logout={logout} navigate={setPage} />

      <Login
        show={page === 'login'}
        setToken={setToken}
        navigate={setPage}
        notify={notify}
      />

      <Authors
        show={page === 'authors'}
        loggedIn={Boolean(token)}
        notify={notify}
      />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} notify={notify} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
