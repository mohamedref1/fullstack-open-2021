import React from 'react'

const LEVEL = {
  error: 'error',
  warn: 'warn',
  info: 'info'
}

const Notification = ({ message, level }) => {
  if (message === null) {
    return null
  }

  const style = {
    fontSize: '21px',
    fontWeight: 'bold',
    padding: '0px 15px',
    boderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '3px',
  }

  switch(level) {
  case LEVEL.error: {
    style.color = 'red'
    style.borderColor = 'red'
    break
  }
  case LEVEL.warn: {
    style.color = 'yellow'
    style.borderColor = 'yellow'
    break
  }
  default: {
    style.color = 'green'
    style.borderColor = 'green'
    break
  }
  }

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  )
}

export default Notification