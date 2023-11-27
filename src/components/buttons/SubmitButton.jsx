import React from 'react'
import ButtonSpinner from '../ButtonSpinner'

function SubmitButton({loading,title}) {
  return (
    <button type='submit' className='default-button'>
      {loading ? <ButtonSpinner/> : <span>{title}</span> }
    </button>
  )
}

export default SubmitButton
