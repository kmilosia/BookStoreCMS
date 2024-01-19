import React from 'react'

function Splash() {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col bg-dracula-900'>
      <img src='https://iili.io/JaxvnRI.gif' width={200} height={200} alt='Loader gif'/>
      <h1 className='text-white font-semibold text-lg'>Ładowanie...</h1>
    </div>
  )
}

export default Splash
