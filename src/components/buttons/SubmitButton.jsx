import React from 'react'
import ButtonSpinner from '../ButtonSpinner'

function SubmitButton({loading,title}) {
  return (
    <button type='submit' className='default-button flex items-center justify-center'>
      {loading ? <ButtonSpinner size={6}/> : <span>{title}</span> }
    </button>
  )
}

export default SubmitButton
