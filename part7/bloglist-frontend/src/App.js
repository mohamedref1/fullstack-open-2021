import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogs'
import { initializeUsers } from './reducers/users'
import { reAuthIfCached } from './reducers/loggedUser'
import AppBar from './components/AppBar'
import User from './components/User'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { Container } from '@mui/material'

const App = () => {
  const [loggedUser, users, blogs] = useSelector((state) => [
    state.loggedUser,
    state.users,
    state.blogs,
  ])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reAuthIfCached())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const matchUser = useMatch('/users/:id')
  const matchedUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const matchedBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  if (loggedUser === null) {
    return (
      <div>
        <AppBar />
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <header>
        <AppBar />
        <Notification />
      </header>

      <Container>
        <Routes>
          <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users/:id" element={<User user={matchedUser} />} />
          <Route path="/users" element={<UserList></UserList>} />
          <Route path="/" element={<Navigate to="/blogs" />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
