import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUserData } from '../store/userSlice'
import { useState } from 'react'

function SidebarAccountElement() {
    const dispatch = useDispatch()
    const [userDetails,setUserDetails] = useState({
      name: '',
      surname: '',
    })
    const {userData} = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(fetchUserData())
    },[])
    useEffect(() => {
      if(userData){
        setUserDetails(userData)
      }
    },[userData])
  return (
    <div className='border-t-[1px] py-4 px-3 grid grid-cols-[max-content_max-content] items-center dark:border-dracula-600'>
        <Link to='/konto' className='flex flex-col mx-2'>
          <h1 className='text-xs font-semibold whitespace-nowrap'>{userDetails.name} {userDetails.surname}</h1>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Admin</p>
        </Link>
    </div>
  )
}

export default SidebarAccountElement
