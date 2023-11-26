import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'

function WebsiteLayoutLink({path,title}) {
  return (
    <Link to={path} className='rounded-md dark:bg-dracula-700 bg-white flex justify-between items-center py-3 px-5 my-1.5 mr-2'>
        <h1 className='text-dracula-900 dark:text-white'>{title}</h1>
        <div className='flex items-center justify-center text-purple-400 hover:text-purple-500 text-sm ml-5'>
            <span>Przejdź</span>
            <GoArrowUpRight />
        </div>
    </Link>
  )
}

export default WebsiteLayoutLink
