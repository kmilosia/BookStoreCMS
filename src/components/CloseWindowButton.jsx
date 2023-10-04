import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function CloseWindowButton(props) {
  return (
    <button className='flex justify-end' onClick={() => props.handleCloseModule()}><AiOutlineClose className='text-xl text-gray-600 hover:text-gray-800 dark:hover:text-gray-400'/></button>
  )
}

export default CloseWindowButton
