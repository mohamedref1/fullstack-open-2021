import { Alert } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const LEVEL = {
  error: 'error',
  warn: 'warn',
  info: 'info',
}

const Notification = () => {
  const { message, level } = useSelector((state) => state.notification)
  if (message === null) {
    return null
  }

  switch (level) {
    case LEVEL.error: {
      return <Alert severity="error">{message}</Alert>
    }
    case LEVEL.warn: {
      return <Alert severity="warn">{message}</Alert>
    }
    default: {
      return <Alert severity="success">{message}</Alert>
    }
  }
}

export default Notification
