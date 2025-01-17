import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function SidebarAccountElement() {
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
    <div className='border-t-[1px] py-4 px-3 grid grid-cols-[max-content_max-content] items-center dark:border-dracula-600'>
        <Link to='/konto' className='flex flex-col mx-2'>
          <h1 className='text-xs font-semibold whitespace-nowrap'>{userData?.name} {userData?.surname}</h1>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{roles}</p>
        </Link>
    </div>
  )
}

export default SidebarAccountElement
