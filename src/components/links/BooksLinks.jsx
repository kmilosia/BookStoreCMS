import React from 'react'
import SideLink from './SideLink'

function BooksLinks({handleLinkClick}) {

  return (
    <div className='flex flex-col overflow-auto overflow-x-hidden px-2 py-1 sidebar-scrollbar my-2'>
        <SideLink handleLinkClick={handleLinkClick} attribute="Book" title="Książka bazowa" path="/ksiazka" />
        <SideLink handleLinkClick={handleLinkClick} attribute="BookItems" title="Egzemplarz książki" path="/egzemplarz" />
        <SideLink handleLinkClick={handleLinkClick} attribute="BookItems" title="Recenzje" path="/recenzja" />
    </div>
  )
}

export default BooksLinks
