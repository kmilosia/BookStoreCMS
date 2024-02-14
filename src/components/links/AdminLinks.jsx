import React from 'react'
import { Link } from 'react-router-dom'

function AdminLinks({handleLinkClick}){
  return (
    <div className='flex flex-col overflow-auto overflow-x-hidden px-2 py-1 sidebar-scrollbar my-2'>
          <Link to='/pracownik' onClick={handleLinkClick} className='sidemenu-link'>Pracownik</Link>
          <Link to='/role' onClick={handleLinkClick} className='sidemenu-link'>Role</Link>
          <Link to='/uprawnienia-dostepu' onClick={handleLinkClick} className='sidemenu-link'>Uprawnienia dostępu</Link>
          <Link to='/wartosci-uprawnien' onClick={handleLinkClick} className='sidemenu-link'>Wartości uprawnień</Link>
          <Link to='/widoki-uprawnien' onClick={handleLinkClick} className='sidemenu-link'>Widoki uprawnień</Link>
    </div>
  )
}

export default AdminLinks
