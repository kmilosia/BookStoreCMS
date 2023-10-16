import React from 'react'
import { Link } from 'react-router-dom'

function OtherLinks() {
  return (
    <div className='flex flex-col overflow-scroll hidden-scroll px-2 py-1 overflow-x-auto'>
        <Link to='/author' className='sidemenu-link'>Autor</Link>
        <Link to='/translator' className='sidemenu-link'>Translator</Link>
    </div>
  )
}

export default OtherLinks
