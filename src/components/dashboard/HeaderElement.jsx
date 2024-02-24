import React from 'react'
import { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

function HeaderElement() {
  const userData = useAuthStore((state) => state.userData)
  const getUserData = useAuthStore((state) => state.getUserData)
    useEffect(() => {
      getUserData()
    },[])
  return (
    <div className='flex w-full rounded-md bg-white dark:bg-dracula-700 px-10 py-10 shadow-md my-2 cursor-default'>
      <div className='w-full grid grid-cols-[5fr_1fr] py-5 relative'>
        <div className='flex flex-col justify-center dark:text-white'>
          <h1 className=' text-4xl font-semibold'>Witaj, {userData?.name}</h1>
          <h2 className='text-xl my-2 font-light'>Rozpocznij swój dzień produktywnie!</h2>
        </div>
        <div className='w-full relative'>
          <img src='https://iili.io/Jo0Q6ga.png' className='absolute top-1/3 -translate-y-1/2 right-0 w-full h-auto object-contain'/>
        </div>
      </div>
    </div>
  )
}

export default HeaderElement
