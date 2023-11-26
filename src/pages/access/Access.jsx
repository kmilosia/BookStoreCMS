import React from 'react'
import { GiSecretBook } from 'react-icons/gi'
import { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function Access() {
  const navigate = useNavigate()
  const {isAuth} = useSelector((state) => state.user)
  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth]);
  return (
    <div className='w-screen h-screen flex justify-center items-center' style={{background: 'linear-gradient(319deg, rgba(168,85,247,1) 0%, rgba(250,245,255,1) 100%)'}}>
    <div className='grid grid-cols-2 w-4/5 h-4/5 bg-white rounded-md shadow-md p-4'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='flex flex-row text-purple-400 w-5/6 cursor-default'>
          <GiSecretBook className='text-3xl mx-1'/>
          <h1 className='text-lg font-semibold font-logo self-end'>Spellarium</h1>
        </div>
      <img src='https://iili.io/JnvTECJ.png' className='h-5/6 w-5/6' alt='Login Vector'/>
      </div>
    <Outlet />
    </div>
    </div>
  )
}

export default Access