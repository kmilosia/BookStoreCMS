import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useAuthStore } from '../../store/authStore'

function LogoutButton() {
  const signOut = useAuthStore((state) => state.signOut)
  return (
    <button onClick={() => signOut()} className='flex flex-row items-center py-1 hover:text-purple-500'>
      <AiOutlineLogout className='text-xl mx-2 '/>
      <span>Wyloguj się</span>
    </button>      
  )
}

export default LogoutButton
