import React from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from '../reducers/loggedUser'
import { useField } from '../hooks/index'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(
      authenticate({
        username: username.attrs.value,
        password: password.attrs.value,
      })
    )

    username.reset()
    password.reset()
  }

  return (
    <div>
      <Typography
        variant="h2"
        component="h2"
        sx={{ mt: 5, textAlign: 'center', fontWeight: 'bold' }}
        color="text.secondary"
        gutterBottom
      >
        Login to application
      </Typography>

      <Grid container direction="row" alignItems="center" justify="center">
        <form style={{ margin: '0 auto' }} onSubmit={handleLogin}>
          <Box>
            <TextField {...username.attrs} label="Username" variant="filled" />
          </Box>
          <Box>
            <TextField {...password.attrs} label="Password" variant="filled" />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              sx={{ display: 'block', mt: 5, mx: 'auto' }}
              type="submit"
            >
              Login
            </Button>
          </Box>
        </form>
      </Grid>
    </div>
  )
}

export default LoginForm
