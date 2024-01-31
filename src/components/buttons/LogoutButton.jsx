import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const navigate = useNavigate()
  const signOut = useAuthStore((state) => state.signOut)
  const handleLogout = () => {
    signOut()
    navigate('/')
  }
  return (
    <button onClick={() => handleLogout()} className='flex flex-row items-center py-1 hover:text-purple-500'>
      <AiOutlineLogout className='text-xl mx-2 '/>
      <span>Wyloguj się</span>
    </button>      
  )
}

export default LogoutButton
