import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users)

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                name
              </TableCell>
              <TableCell align="right">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center" colSpan={3}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
