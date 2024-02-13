import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function StockLinks({setIsSideMenuExpanded}) {
  const decodedToken = useAuthStore((state) => state.decodedToken)
  const handleClick = () => {
    setIsSideMenuExpanded(false)
  }
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <Link to='/stan-magazynu' onClick={handleClick} className='sidemenu-link'>Stan magazynu</Link>
        <Link to='/dostawca' onClick={handleClick} className='sidemenu-link'>Dostawca</Link>
        <Link to='/dostawa' onClick={handleClick} className='sidemenu-link'>Nowa dostawa</Link>
    </div>
  )
}

export default StockLinks
