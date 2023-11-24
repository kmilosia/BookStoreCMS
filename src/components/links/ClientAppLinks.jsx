import React from 'react'
import { Link } from 'react-router-dom'

function ClientAppLinks() {
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <div className='flex flex-col'>
        <h1 className='text-sm my-2 font-semibold cursor-default text-dracula-500 dark:text-dracula-400'>Footer</h1>
        <Link to='/footer-kolumna' className='sidemenu-link'>Kolumna footer</Link>
        <Link to='/footer-link' className='sidemenu-link'>Link footer</Link>
        <h1 className='text-sm my-2 font-semibold cursor-default text-dracula-500 dark:text-dracula-400'>Navbar</h1>
        <Link to='/footer-kolumna' className='sidemenu-link'>Menu Linki</Link>
        <h1 className='text-sm my-2 font-semibold cursor-default text-dracula-500 dark:text-dracula-400'>Strony</h1>
        <Link to='/footer-kolumna' className='sidemenu-link'>Category Element</Link>
        </div>
    </div>
  )
}

export default ClientAppLinks
