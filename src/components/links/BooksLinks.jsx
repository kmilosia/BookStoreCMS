import React from 'react'
import { Link } from 'react-router-dom'

function BooksLinks({setIsSideMenuExpanded}) {
  const handleClick = () => {
    setIsSideMenuExpanded(false)
  }
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <Link to='/ksiazka' onClick={handleClick} className='sidemenu-link'>Książka bazowa</Link>
        <Link to='/egzemplarz' onClick={handleClick} className='sidemenu-link'>Egzemplarz książki</Link>
        <Link to='/recenzja' onClick={handleClick} className='sidemenu-link'>Recenzje</Link>
    </div>
  )
}

export default BooksLinks
