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
      toggleVisibilty
    }
  })

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={() => setVisible(true)}>new blog</button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable