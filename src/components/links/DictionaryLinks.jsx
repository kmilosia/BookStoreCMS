import React from 'react'
import { Link } from 'react-router-dom'

function DictionaryLinks() {
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <Link to='/autor' className='sidemenu-link'>Autor</Link>
        <Link to='/dostepnosc' className='sidemenu-link'>Dostępność</Link>
        <Link to='/edycja-ksiazki' className='sidemenu-link'>Edycja</Link>
        <Link to='/forma-dostawy' className='sidemenu-link'>Forma Dostawy</Link>
        <Link to='/format' className='sidemenu-link'>Format Książki</Link>
        <Link to='/format-pliku' className='sidemenu-link'>Format Pliku</Link>
        <Link to='/jezyk' className='sidemenu-link'>Język</Link>
        <Link to='/kategoria' className='sidemenu-link'>Kategoria</Link>
        <Link to='/kraj' className='sidemenu-link'>Kraj</Link>
        <Link to='/metoda-platnosci' className='sidemenu-link'>Metoda Płatności</Link>  
        <Link to='/miasto' className='sidemenu-link'>Miasto</Link>
        <Link to='/plec' className='sidemenu-link'>Płeć</Link>
        <Link to='/przywileje' className='sidemenu-link'>Przywileje</Link>  
        <Link to='/status-dostawy' className='sidemenu-link'>Status Dostawy</Link>
        <Link to='/status-konta' className='sidemenu-link'>Status Konta</Link>
        <Link to='/status-transakcji' className='sidemenu-link'>Status Transakcji</Link>  
        <Link to='/status-wypozyczenia' className='sidemenu-link'>Status Wypożyczenia</Link> 
        <Link to='/status-wysylki' className='sidemenu-link'>Status Wysyłki</Link>
        <Link to='/status-zamowienia' className='sidemenu-link'>Status Zamówienia</Link>
        <Link to='/translator' className='sidemenu-link'>Translator</Link>
        <Link to='/typ-wypozyczenia' className='sidemenu-link'>Typ Wypożyczenia</Link>       
        <Link to='/wydawnictwo' className='sidemenu-link'>Wydawnictwo</Link>
    </div>
  )
}

export default DictionaryLinks
