import React from 'react'
import { Link } from 'react-router-dom'

function DictionaryLinks() {
  return (
    <div className='flex flex-col overflow-scroll hidden-scroll px-2 py-1 overflow-x-auto'>
        <Link to='/account-status' className='sidemenu-link'>Status Konta</Link>
        <Link to='/availability' className='sidemenu-link'>Dostępność</Link>
        <Link to='/category' className='sidemenu-link'>Kategoria</Link>
        <Link to='/city' className='sidemenu-link'>Miasto</Link>
        <Link to='/country' className='sidemenu-link'>Kraj</Link>
        <Link to='/delivery-method' className='sidemenu-link'>Forma Dostawy</Link>
        <Link to='/delivery-status' className='sidemenu-link'>Status Dostawy</Link>
        <Link to='/edition' className='sidemenu-link'>Edycja</Link>
        <Link to='/file-format' className='sidemenu-link'>Format Pliku</Link>
        <Link to='/gender' className='sidemenu-link'>Płeć</Link>
        <Link to='/form' className='sidemenu-link'>Format</Link>
        <Link to='/order-status' className='sidemenu-link'>Status Zamówienia</Link>
        <Link to='/language' className='sidemenu-link'>Język</Link>
        <Link to='/payment-method' className='sidemenu-link'>Forma Płatności</Link>  
        <Link to='/permission' className='sidemenu-link'>Przywileje</Link>  
        <Link to='/transaction-status' className='sidemenu-link'>Status Transakcji</Link>  
        <Link to='/shipping-status' className='sidemenu-link'>Status Dostawy</Link>
        <Link to='/rental-status' className='sidemenu-link'>Status Wypożyczenia</Link>       
     
    </div>
  )
}

export default DictionaryLinks
