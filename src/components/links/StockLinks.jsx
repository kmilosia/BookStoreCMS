import React from 'react'
import SideLink from './SideLink'

function StockLinks({handleLinkClick}) {

  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <SideLink handleLinkClick={handleLinkClick} attribute="StockAmount" title="Stan magazynu" path="/stan-magazynu" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Supplier" title="Dostawca" path="/dostawca" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Supply" title="Nowa dostawa" path="/dostawa" />
    </div>
  )
}

export default StockLinks
