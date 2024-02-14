import React from 'react'
import SideLink from './SideLink'

function DiscountsLinks({handleLinkClick}) {
  
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <SideLink handleLinkClick={handleLinkClick} attribute="Discount" title="Promocje tymczasowe" path="/promocja" />
        <SideLink handleLinkClick={handleLinkClick} attribute="DiscountCodes" title="Kody rabatowe" path="/kod-rabatowy" />
    </div>
  )
}

export default DiscountsLinks
