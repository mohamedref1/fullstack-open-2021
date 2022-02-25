import React from 'react'
import PropTypes from 'prop-types'

const LogoutForm = ({ logout }) => {
  return (
    <form onSubmit={logout}>
      <button type='submit'>logout</button>
    </form>

  )
}

LogoutForm.propTypes = {
  logout: PropTypes.func.isRequired
}

export default LogoutForm