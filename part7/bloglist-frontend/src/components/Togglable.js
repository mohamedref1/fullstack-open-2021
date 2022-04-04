import { Button } from '@mui/material'
import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideIfVisible = visible ? { display: 'none' } : { display: '' }
  const showIfVisible = visible ? { display: '' } : { display: 'none' }

  const toggleVisibilty = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibilty,
    }
  })

  return (
    <div>
      <div style={hideIfVisible}>
        <Button
          variant="contained"
          color="success"
          onClick={() => setVisible(true)}
          sx={{ display: 'block', my: 5, mx: 'auto' }}
        >
          new blog
        </Button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <Button
          variant="contained"
          color="error"
          onClick={() => setVisible(false)}
          sx={{ display: 'block', mx: 'auto', my: 2 }}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
