import React from 'react'
import pageNotFoundImage from '../assets/404.png'
import { Link } from 'react-router-dom'

function PageNotFoundError() {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full p-10 bg-slate-200 dark:bg-gray-700'>
      <img src={pageNotFoundImage} alt='Page not found image' className='w-1/2'/>
      <h1 className='text-3xl my-4 font-semibold text-gray-800 dark:text-gray-100'>Oops! This page doesn't exist!</h1>
      <Link className='px-3 py-2 font-semibold rounded-md text-gray-100 bg-saphire-500 hover:bg-saphire-600'>Go Back Home</Link>
    </div>
  )
}

export default PageNotFoundError
