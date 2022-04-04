import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notification'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedUserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: () => {
      return null
    },
  },
})

const { setUser, clearUser } = loggedUserSlice.actions

export const authenticate = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(
        notify({
          message: `${user.name} logged-in successfully`,
          level: 'info',
        })
      )
    } catch (exception) {
      dispatch(
        notify({ message: 'wrong username or password', level: 'error' })
      )
    }
  }
}

export const deAuthenticate = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(clearUser())
    dispatch(notify({ message: 'logged-out successfully', level: 'info' }))
  }
}

export const reAuthIfCached = () => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('loggedBlogsappUser'))
    dispatch(setUser(user))
    if (user !== null) {
      blogService.setToken(user.token)
    }
  }
}

export default loggedUserSlice.reducer
