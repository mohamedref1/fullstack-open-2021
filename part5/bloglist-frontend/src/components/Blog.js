import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, addLike, removeBlog }) => {
  const [details, setDetails] = useState(false)

  const blogStyle = {
    border: '1px solid black',
    padding: '5px',
    marginBottom: '4px',
    marginTop: '4px'
  }

  if (details) {
    return (
      <div className='blog' style={blogStyle}>
        <button onClick={() => setDetails(false)}>hide</button>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
        {
          blog.user.username === username
            ? <button id="blog-rm" onClick={() => removeBlog(blog)}>remove</button>
            : null
        }

      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setDetails(true)}>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog