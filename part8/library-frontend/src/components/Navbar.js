const Navbar = ({ loggedIn, logout, navigate }) => {
  if (!loggedIn) {
    return (
      <div>
        <button onClick={() => navigate('authors')}>authors</button>
        <button onClick={() => navigate('books')}>books</button>
        <button onClick={() => navigate('login')}>login</button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate('authors')}>authors</button>
        <button onClick={() => navigate('books')}>books</button>
        <button onClick={() => navigate('add')}>add book</button>
        <button onClick={() => navigate('recommend')}>recommend</button>
        <button
          onClick={() => {
            logout()
            navigate('authors')
          }}
        >
          logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
