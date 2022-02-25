import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }

    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form className='blogForm' onSubmit={addBlog}>
        <div>
          <label htmlFor='title'>title:</label>
          <input
            type='text'
            name='title'
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input
            type='text'
            name='author'
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input
            type='text'
            name='url'
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm