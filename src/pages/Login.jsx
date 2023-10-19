import React, { useState } from 'react'
import logoBlack from '../assets/logo-black.png'
import loginIcon from '../assets/login.png'
import {AiFillEye} from 'react-icons/ai'
import { GiSecretBook } from 'react-icons/gi'

function Login() {
  const [showPassword, setShowPassword] = useState(true)
  return (
    <div className='w-screen h-screen flex justify-center items-center' style={{
      background: 'linear-gradient(80deg, rgba(255,237,213,1) 0%, rgba(253,186,116,1) 100%)'
    }}>
    <div className='grid grid-cols-2 w-4/5 h-4/5 bg-white rounded-md shadow-lg p-4'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='flex flex-row text-orange-500 w-5/6 cursor-default'>
          <GiSecretBook className='text-3xl mx-1'/>
          <h1 className='text-lg font-semibold font-logo self-end'>Spellarium</h1>
        </div>
      <img src={loginIcon} className='h-5/6 w-5/6' alt='Login Illustration Vector'/>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-start w-2/3'>
        <h1 className='text-2xl my-2 font-semibold text-dracula-600'>Zaloguj się</h1>
        <label className='text-gray-500 text-sm mt-2'>Login</label>
        <input type='text' placeholder='Login' className='focus:border-dracula-400 text-sm focus:outline-none text-dracula-900 bg-dracula-100 border-dracula-300 resize-none rounded-sm my-2 px-3 py-2 w-full border-[2px]'/>
        <label className='text-gray-500 text-sm mt-2'>Hasło</label>
        <div className='relative w-full'>
        <input type={showPassword ? 'text' : 'password'} placeholder='Hasło' className='focus:border-dracula-400 text-sm focus:outline-none text-dracula-900 bg-dracula-100 border-dracula-300 resize-none rounded-sm my-2 px-3 py-2 w-full border-[2px]'/>
          <span onClick={() => setShowPassword(!showPassword)} className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-dracula-400 hover:text-dracula-500'><AiFillEye /></span>
        </div>
        <button className='self-end my-2 text-sm text-orange-600 hover:text-orange-700'>Zapomniałeś hasła?</button>
        <button className='my-2 w-full px-4 py-2 rounded-sm text-white bg-orange-400 transition-all hover:bg-orange-500'>Kontynuuj</button>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login
