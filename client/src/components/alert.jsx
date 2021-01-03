import React from 'react'
import ReactDOM from 'react-dom'

const Alert = ({ message, variant }) => {
  const messageData = message ? message.split(',') : null
  const alert =
    messageData !== null ? (
      <div className='alertContainer'>
        {messageData.map((msg, i) => (
          <div key={i} className={`alert alert-${variant}`}>
            {msg}
          </div>
        ))}
      </div>
    ) : null
  return ReactDOM.createPortal(
    <>{alert}</>,
    document.getElementById('alert-root')
  )
}

export default Alert
