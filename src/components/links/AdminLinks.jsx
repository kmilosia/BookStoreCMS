import React from 'react'
import SideLink from './SideLink'

function AdminLinks({handleLinkClick}){
  return (
    <div className='flex flex-col overflow-auto overflow-x-hidden px-2 py-1 sidebar-scrollbar my-2'>
        <SideLink handleLinkClick={handleLinkClick} attribute="Employees" title="Pracownik" path="/pracownik" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Roles" title="Role" path="/role" />
        <SideLink handleLinkClick={handleLinkClick} attribute="RolesClaims" title="Uprawnienia dostępu" path="/uprawnienia-dostepu" />
        <SideLink handleLinkClick={handleLinkClick} attribute="ClaimValues" title="Wartości uprawnień" path="/wartosci-uprawnien" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Claims" title="Widoki uprawnień" path="/widoki-uprawnien" />
    </div>
  )
}

export default AdminLinks
