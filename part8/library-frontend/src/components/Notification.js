const Notification = ({ message, level }) => {
  if (!message) {
    return null
  }

  const color =
    level === 'error' ? 'red' : level === 'warn' ? 'yellow' : 'green'

  const Style = {
    border: `2px solid ${color}`,
    padding: '5px',
    margin: '5px 0',
    color,
  }

  return (
    <div style={Style}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
