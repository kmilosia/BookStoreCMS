import React, { useState } from 'react'
import logoBlack from '../assets/logo-black.png'
import loginIcon from '../assets/login.png'
import {AiFillEye} from 'react-icons/ai'

function Login() {
  const [showPassword, setShowPassword] = useState(true)
  return (
    <div className='w-screen h-screen flex justify-center items-center' style={{background: 'rgb(125,151,244)',
      background: 'linear-gradient(280deg, rgba(125,151,244,1) 0%, rgba(231,237,253,1) 100%)'
    }}>
    <div className='grid grid-cols-2 w-4/5 h-4/5 bg-white rounded-md shadow-lg p-4'>
      <div className='flex items-center justify-center w-full h-full'>
      <img src={loginIcon} className='h-5/6 w-5/6' alt='Login Illustration Vector'/>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-start w-2/3'>
        <img src={logoBlack} width={70} alt='Logo' className='self-center' />
        <h1 className='text-2xl my-2 text-gray-700'>Sign In</h1>
        <label className='text-gray-500 text-sm mt-2'>Username</label>
        <input type='text' placeholder='Username' className='text-sm w-full my-2 rounded-md border-2 p-2 placeholder:text-sm placeholder:text-gray-300'/>
        <label className='text-gray-500 text-sm mt-2'>Password</label>
        <div className='relative w-full'>
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='text-sm w-full my-2 rounded-md border-2 p-2 placeholder:text-sm placeholder:text-gray-300'/>
          <span onClick={() => setShowPassword(!showPassword)} className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-gray-500 hover:text-gray-600'><AiFillEye /></span>
        </div>
        <button className='self-end my-2 text-sm text-saphire-600 hover:text-saphire-700'>Forgot your password?</button>
        <button className='my-2 w-full px-4 py-2 rounded-sm text-white bg-saphire-400 transition-all hover:bg-saphire-500'>Continue</button>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login
