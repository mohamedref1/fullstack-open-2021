import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { Button, CardContent, Card, Typography } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  return (
    <div>
      <Typography
        variant="h2"
        component="h2"
        sx={{ mt: 5, textAlign: 'center', fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        Blogs
      </Typography>

      <Togglable ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <div>
        {blogs
          .slice() // Copying
          .sort((b1, b2) => b2.likes - b1.likes)
          .map((blog) => (
            <Card key={blog.id} sx={{ minWidth: 275, mb: 5 }}>
              <CardContent>
                <Typography variant="h5" component="p">
                  <Button
                    size="large"
                    component={Link}
                    to={`/blogs/${blog.id}`}
                  >
                    {blog.title}
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default BlogList
