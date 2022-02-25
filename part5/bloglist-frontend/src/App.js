import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [level, setLevel] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedBlogsappUser'))
    setUser(user)
    if (user !== null) {
      blogService.setToken(user.token)
    }

    if (user !== null) {
      setMessage(`${user.name} logged-in successfully`)
      setLevel('info')
      setTimeout(() => {
        setMessage(null)
        setLevel(null)
      }, 5000)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchData()
  }, [])

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))

      setMessage(`${user.name} logged-in successfully`)
      setLevel('info')
      setTimeout(() => {
        setMessage(null)
        setLevel(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong username or password')
      setLevel('error')
      setTimeout(() => {
        setMessage(null)
        setLevel(null)
      }, 5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    localStorage.clear()
    setUser(null)
    setMessage('logged-out successfully')
    setLevel('info')
    setTimeout(() => {
      setMessage(null)
      setLevel(null)
    }, 5000)
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs( blogs.concat(newBlog) )
      setMessage(`a new blog: ${newBlog.title} by ${newBlog.author} added`)
      setLevel('info')
      setTimeout(() => {
        setMessage(null)
        setLevel(null)
      }, 5000)
      blogFormRef.current.toggleVisibilty()
    } catch (exception) {
      setMessage('failed to add a new blog. Check your entries')
      setLevel('error')
      setTimeout(() => {
        setMessage(null)
        setLevel(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    // eslint-disable-next-line no-restricted-globals
    const remove = confirm(`Remove blog: ${blog.title} by ${blog.author}`)
    if (!remove) {
      return
    }

    await blogService.remove(blog.id)
    setMessage(`${blog.title} by ${blog.author} removed`)
    setLevel('info')
    setTimeout(() => {
      setMessage(null)
      setLevel(null)
    }, 5000)

    setBlogs(blogs.filter(({ id }) => blog.id !== id))

  }

  const addLike = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })

    setMessage(`like added to ${blog.title}`)
    setLevel('info')
    setTimeout(() => {
      setMessage(null)
      setLevel(null)
    }, 5000)

    setBlogs(blogs.map((blog) => updatedBlog.id === blog.id ? updatedBlog : blog))
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={message}
          level={level}
        />
        <LoginForm
          login={login}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification
        message={message}
        level={level}
      />
      <h2>blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <LogoutForm logout={logout} />
      </div>
      <Togglable ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(blog =>
            <Blog key={blog.id}
              blog={blog}
              username={user.username}
              addLike={addLike}
              removeBlog={removeBlog} />
          )}
      </div>
    </div>
  )
}

export default App