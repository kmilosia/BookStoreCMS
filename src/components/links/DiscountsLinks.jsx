import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function DiscountsLinks({setIsSideMenuExpanded}) {
  const decodedToken = useAuthStore((state) => state.decodedToken)
  const handleClick = () => {
    setIsSideMenuExpanded(false)
  }
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <Link to='/promocja' onClick={handleClick} className='sidemenu-link'>Promocje tymczasowe</Link>
        <Link to='/kod-rabatowy' onClick={handleClick} className='sidemenu-link'>Kody rabatowe</Link>
    </div>
  )
}

export default DiscountsLinks
