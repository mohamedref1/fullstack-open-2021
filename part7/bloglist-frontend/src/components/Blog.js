import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { removeOneBlog, addOneLike, addOneComment } from '../reducers/blogs'
import { useField } from '../hooks/index'

const Blog = ({ blog }) => {
  const username = useSelector((state) => state.loggedUser.username)
  const comment = useField('text')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeBlog = () => {
    const remove = confirm(`Remove blog: ${blog.title} by ${blog.author}`)
    if (!remove) {
      return
    }

    dispatch(removeOneBlog(blog))
    navigate('/')
  }

  const addLike = () => {
    dispatch(addOneLike(blog))
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addOneComment(blog.id, comment.attrs.value))
    comment.reset()
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="h4"
        sx={{ mt: 5, fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        {blog.title}
      </Typography>

      <Typography
        variant="p"
        component="p"
        sx={{ mt: 3, fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        for more information: <a href={blog.url}>click here</a>
      </Typography>

      <Typography
        variant="p"
        component="p"
        sx={{ mt: 2, fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        likes: {blog.likes}
        <Button
          variant="contained"
          type="submit"
          sx={{ height: 24, ml: 1, mt: 0, padding: 0 }}
          onClick={() => addLike()}
        >
          like
        </Button>
      </Typography>

      <Typography
        variant="p"
        component="p"
        sx={{ mt: 2, fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        added by {blog.author}
      </Typography>

      {blog.user.username === username ? (
        <Button
          variant="contained"
          color="error"
          type="submit"
          onClick={() => removeBlog()}
        >
          remove
        </Button>
      ) : null}

      <Typography
        variant="h5"
        component="h5"
        sx={{ mt: 5, fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        Comments
      </Typography>
      <form onSubmit={addComment}>
        <TextField
          {...comment.attrs}
          id="filled-basic"
          label="write a comment"
          variant="filled"
          sx={{ height: 55, width: '70%' }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ height: 55, width: '30%' }}
        >
          add comment
        </Button>
      </form>
      <TableContainer component={Paper} sx={{ my: 5 }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableBody>
            {blog.comments.map(({ id, content }) => (
              <TableRow key={id}>
                <TableCell align="left" colSpan={3}>
                  {content}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blog
