import React from 'react'
import { Link } from 'react-router-dom'

function LayoutLinks() {
  return (
    <div className='flex flex-col overflow-scroll hidden-scroll px-2 py-1 overflow-x-auto'>
        <Link to='/footer-links' className='sidemenu-link'>Linki w stopce</Link>
        <Link to='/footer-columns' className='sidemenu-link'>Kolumny w stopce</Link>
    </div>
  )
}

export default LayoutLinks
