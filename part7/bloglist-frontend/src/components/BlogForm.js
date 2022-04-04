import React from 'react'
import { useDispatch } from 'react-redux'
import { addOneBlog } from '../reducers/blogs'
import { useField } from '../hooks/index'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.attrs.value,
      author: author.attrs.value,
      url: url.attrs.value,
    }

    const callback = blogFormRef.current.toggleVisibilty
    dispatch(addOneBlog(blog, callback))

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="h4"
        sx={{ mt: 5, textAlign: 'center', fontWeight: 'bold' }}
        color="success.main"
        gutterBottom
      >
        create new
      </Typography>

      <Grid container direction="row" alignItems="center" justify="center">
        <form style={{ margin: '0 auto' }} onSubmit={addBlog}>
          <Box>
            <TextField
              {...title.attrs}
              id="filled-basic"
              label="Title"
              variant="filled"
            />
          </Box>
          <Box>
            <TextField
              {...author.attrs}
              id="filled-basic"
              label="Author"
              variant="filled"
            />
          </Box>
          <Box>
            <TextField
              {...url.attrs}
              id="filled-basic"
              label="URL"
              variant="filled"
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              sx={{ display: 'block', mt: 3, mx: 'auto' }}
              type="submit"
            >
              create
            </Button>
          </Box>
        </form>
      </Grid>
    </div>
  )
}

export default BlogForm
