import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFoundError() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full p-10 bg-slate-200 dark:bg-dracula-700'>
      <img src='https://iili.io/JoVw2nf.png' alt='Page not found' className='w-1/2'/>
      <h1 className='text-3xl my-2 font-semibold text-dracula-800 dark:text-gray-100'>Ta strona nie istnieje lub jest niedostępna!</h1>
      <Link to='/' className='default-button w-max rounded-3xl'>Wróć</Link>
    </div>
  )
}

export default PageNotFoundError
