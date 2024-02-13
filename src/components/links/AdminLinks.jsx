import React from 'react'
import { Link } from 'react-router-dom'

function AdminLinks({setIsSideMenuExpanded}) {
  const handleClick = () => {
    setIsSideMenuExpanded(false)
  }
  return (
    <div className='flex flex-col overflow-auto overflow-x-hidden px-2 py-1 sidebar-scrollbar my-2'>
        <Link to='/role' onClick={handleClick} className='sidemenu-link'>Role</Link>
        <Link to='/pracownik' onClick={handleClick} className='sidemenu-link'>Pracownik</Link>
        <Link to='/wartosci-uprawnien' onClick={handleClick} className='sidemenu-link'>Wartości uprawnień</Link>
        <Link to='/widoki-uprawnien' onClick={handleClick} className='sidemenu-link'>Widoki uprawnień</Link>
        <Link to='/uprawnienia-dostepu' onClick={handleClick} className='sidemenu-link'>Uprawnienia dostępu</Link>
    </div>
  )
}

export default AdminLinks
