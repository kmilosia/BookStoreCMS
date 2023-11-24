import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function ManageContentElement(props) {
  return (
    <div className='flex w-full rounded-md bg-white dark:bg-dracula-700 px-5 py-3 my-2 shadow-sm'>
    <div className='grid grid-cols-[max-content_auto_max-content] gap-5 w-full'>
      <img src={props.imgURL} className='w-full h-20 object-contain' />
      <div className='flex flex-col justify-center w-full text-dracula-700 dark:text-white cursor-default'>
        <h1 className='text-xl font-semibold'>{props.title}</h1>
        <h2 className=''>{props.content}</h2>
      </div>
      <div className='flex items-center'>
      <Link to={props.path} className='flex items-center justify-center text-white text-2xl bg-purple-400 rounded-3xl p-3 hover:bg-purple-500'><FaPlus /></Link>
      </div>
    </div>
  </div> 
  )
}

export default ManageContentElement
