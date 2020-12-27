import React from 'react'

const FormError = ({ errMsg }) => {
  return (
    <div>
      <h2>ERROR !</h2>
      <h3 className='form_error'>{errMsg}</h3>
    </div>
  )
}

export default FormError
