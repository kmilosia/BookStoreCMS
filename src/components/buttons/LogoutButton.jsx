import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleClick = () => {
        dispatch(logout())
        navigate('/login')
    }
  return (
    <button onClick={handleClick} className='flex flex-row items-center py-1 hover:text-purple-500'>
      <AiOutlineLogout className='text-xl mx-2 '/>
      <span>Wyloguj się</span>
    </button>      
  )
}

export default LogoutButton
