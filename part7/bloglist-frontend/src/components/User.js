import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
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
        {user.name}
      </Typography>

      <Typography
        variant="h5"
        component="h5"
        sx={{ mt: 5, textAlign: 'center', fontWeight: 'bold' }}
        color="success.main"
        gutterBottom
      >
        added blogs
      </Typography>

      <div>
        {user.blogs
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

export default User
