import React from 'react'
import SideLink from './SideLink'

function ClientAppLinks({handleLinkClick}) {
 
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <div className='flex flex-col'>
          <h1 className='text-sm my-2 font-semibold cursor-default text-dracula-500 dark:text-dracula-400'>Footer</h1>
          <SideLink handleLinkClick={handleLinkClick} attribute="FooterColumns" title="Kolumna footer" path="/footer-kolumna" />
          <SideLink handleLinkClick={handleLinkClick} attribute="FooterLinks" title="Link footer" path="/footer-link" />
          <h1 className='text-sm my-2 font-semibold cursor-default text-dracula-500 dark:text-dracula-400'>Navbar</h1>
          <SideLink handleLinkClick={handleLinkClick} attribute="NavBarMenuLinks" title="Menu Linki" path="/navbar-link" />
          <h1 className='text-sm my-2 font-semibold cursor-default text-dracula-500 dark:text-dracula-400'>Elementy stron</h1>
          <SideLink handleLinkClick={handleLinkClick} attribute="Banner" title="Baner" path="/baner" />
          <SideLink handleLinkClick={handleLinkClick} attribute="DiscountsBanner" title="Baner promocyjny" path="/baner-promocyjny" />
          <SideLink handleLinkClick={handleLinkClick} attribute="CategoryElements" title="Element kategorii" path="/element-kategorii" />
        </div>
    </div>
  )
}

export default ClientAppLinks
