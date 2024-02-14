import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'

function Account() {
  const userData = useAuthStore((state) => state.userData)
  const getUserData = useAuthStore((state) => state.getUserData)
  const [roles,setRoles] = useState('')
  useEffect(() => {
    getUserData()
  },[])
  useEffect(() => {
    const roles = userData?.roleNames?.join()
    setRoles(roles)
  },[userData?.roleNames])
 
  return (
    <>
    <div className='main-wrapper overflow-y-auto page-scrollbar'>
        <div className='flex flex-col'>
        <h1 className='main-header mx-0 my-2'>Konto</h1> 
          <div className='rounded-md bg-white dark:bg-dracula-700 flex flex-col px-5 py-5 w-full text-dracula-900 dark:text-white'>
          <h2 className='text-xl font-semibold text-dracula-500 dark:text-gray-300 mb-2'>Informacje o użytkowniku</h2> 
            <div className='grid grid-cols-2 gap-2 w-full 2xl:w-2/3'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='input-label'>Imię</label>
              <input disabled id='name' name='name' type="text" value={userData?.name} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='surname' className='input-label'>Nazwisko</label>
              <input disabled id='surname' name='surname' type="text" value={userData?.surname} className='input-default'/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor='username' className='input-label'>Nazwa użytkownika</label>
              <input disabled id='username' name='username' type="text" value={userData?.username} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='input-label'>Email</label>
              <input disabled id='email' name='email' type="text" value={userData?.email} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='phoneNumber' className='input-label'>Numer telefonu</label>
              <input disabled id='phoneNumber' name='phoneNumber' type="text" value={userData?.phoneNumber} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='phoneNumber' className='input-label'>Rola</label>
              <input disabled id='role' name='role' type="text" value={roles} className='input-default'/>
            </div>
            </div>         
          </div>          
        </div>
    </div>
    </>
  )
}

export default Account
