import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notification'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      const blog = action.payload
      return state.concat(blog)
    },
    replaceBlog: (state, action) => {
      const id = action.payload.id
      const updatedBlog = action.payload.blog

      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    },
    removeBlog: (state, action) => {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addLike: (state, action) => {
      const id = action.payload
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    },
  },
})

const { setBlogs, removeBlog, addLike, appendBlog, replaceBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addOneBlog = (blog, done) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(
        notify({
          message: `a new blog: ${blog.title} by ${blog.author} added`,
          level: 'info',
        })
      )
      done()
    } catch (exception) {
      dispatch(
        notify({
          message: `failed to add the given blog`,
          level: 'error',
        })
      )
    }
  }
}

export const removeOneBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(
        notify({
          message: `${blog.title} by ${blog.author} removed`,
          level: 'info',
        })
      )
    } catch (exception) {
      dispatch(
        notify({
          message: `failed to remove the given blog`,
          level: 'error',
        })
      )
    }
  }
}

export const addOneLike = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.update(blog.id, {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      })
      dispatch(addLike(blog.id))

      dispatch(
        notify({ message: `like added to ${blog.title}`, level: 'info' })
      )
    } catch (exception) {
      notify({
        message: `failed to add like to the given blog`,
        level: 'error',
      })
    }
  }
}

export const addOneComment = (id, content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, content)
      dispatch(replaceBlog({ id, blog: updatedBlog }))
      dispatch(
        notify({
          message: `comment ${content} added`,
          level: 'info',
        })
      )
    } catch (exception) {
      dispatch(
        notify({
          message: `failed to add the given comment`,
          level: 'error',
        })
      )
    }
  }
}

export default blogSlice.reducer
