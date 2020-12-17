import React from 'react'

const FormError = ({ errMsg }) => {
  return (
    <div className='form_error card'>
      <h2>{errMsg}</h2>
    </div>
  )
}

export default FormError
