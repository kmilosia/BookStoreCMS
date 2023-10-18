import React from 'react'
import { Link } from 'react-router-dom'

function BookLinks() {
  return (
    <div className='flex flex-col overflow-scroll hidden-scroll px-2 py-1 overflow-x-auto'>
        <Link to='/book' className='sidemenu-link'>Książka</Link>
        <Link to='/author' className='sidemenu-link'>Autor</Link>
        <Link to='/translator' className='sidemenu-link'>Translator</Link>
        <Link to='/publisher' className='sidemenu-link'>Wydawnictwo</Link>
        <Link to='/image' className='sidemenu-link'>Zdjęcie</Link>
    </div>
  )
}

export default BookLinks
