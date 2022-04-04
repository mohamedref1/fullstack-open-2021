import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogs'
import usersReducer from './reducers/users'
import loggedUser from './reducers/loggedUser'
import notificationReducer from './reducers/notification'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: usersReducer,
    loggedUser: loggedUser,
    notification: notificationReducer,
  },
})

export default store
