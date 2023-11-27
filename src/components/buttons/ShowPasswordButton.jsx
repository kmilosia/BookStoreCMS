import React from 'react'
import { AiFillEye } from 'react-icons/ai'

function ShowPasswordButton({showPassword,setShowPassword,inputType}) {
  return (
    <AiFillEye onClick={() => {setShowPassword(!showPassword)}} 
    className={`absolute right-3 ${inputType === 'floating' ? 'top-4' : 'top-2.5'} text-xl cursor-pointer text-purple-400 hover:text-purple-500`}/>
  )
}

export default ShowPasswordButton
