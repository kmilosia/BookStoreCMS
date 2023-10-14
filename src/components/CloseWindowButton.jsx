import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function CloseWindowButton(props) {
  return (
    <button className='flex justify-end' onClick={() => props.handleCloseModule()}><AiOutlineClose className='text-xl transition-all text-dracula-500 hover:text-dracula-600 dark:hover:text-dracula-400'/></button>
  )
}

export default CloseWindowButton
