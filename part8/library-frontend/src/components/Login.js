import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../graphql/index'

const Login = ({ show, navigate, setToken, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      notify(err.message, 'error')
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('loggedin-user-token', token)
      window.location.reload() // A temporal solution
      navigate('authors')
      notify(`${username} logged-in successfully`, 'info')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    login({
      variables: { username, password },
    })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username:{' '}
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
