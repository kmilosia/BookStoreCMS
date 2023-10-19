import React from 'react'
import castle from '../assets/horror-castle.png'

function Home() {
  return (
    <div className='bg-slate-200 h-full flex flex-col items-center justify-center dark:bg-dracula-900'>
      <h1 className='text-dracula-900 dark:text-dracula-100 font-semibold text-3xl my-2'>Witaj, Hannah Montana</h1>
      <img src={castle} className='w-1/3 h-2/3 object-cover'/>
      <h2 className='text-dracula-900 dark:text-dracula-100 font-semibold text-xl my-2'>Nadchodzi Halloween, pomóż nam przygotować się do tego strasznego czasu..</h2>
    </div>
  )
}

export default Home
