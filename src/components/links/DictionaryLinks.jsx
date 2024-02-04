import React from 'react'
import { Link } from 'react-router-dom'

function DictionaryLinks({setIsSideMenuExpanded}) {
  const handleClick = () => {
    setIsSideMenuExpanded(false)
  }
  return (
    <div className='flex flex-col overflow-auto px-2 py-1 sidebar-scrollbar my-2'>
        <Link to='/autor' onClick={handleClick} className='sidemenu-link'>Autor</Link>
        <Link to='/dostepnosc' onClick={handleClick} className='sidemenu-link'>Dostępność</Link>
        <Link to='/edycja-ksiazki' onClick={handleClick} className='sidemenu-link'>Edycja</Link>
        <Link to='/format' onClick={handleClick} className='sidemenu-link'>Format Książki</Link>
        <Link to='/format-pliku' onClick={handleClick} className='sidemenu-link'>Format Pliku</Link>
        <Link to='/jezyk' onClick={handleClick} className='sidemenu-link'>Język</Link>
        <Link to='/kategoria' onClick={handleClick} className='sidemenu-link'>Kategoria</Link>
        <Link to='/kraj' onClick={handleClick} className='sidemenu-link'>Kraj</Link>
        <Link to='/metoda-dostawy' onClick={handleClick} className='sidemenu-link'>Metoda Dostawy</Link>
        <Link to='/metoda-platnosci' onClick={handleClick} className='sidemenu-link'>Metoda Płatności</Link>  
        <Link to='/miasto' onClick={handleClick} className='sidemenu-link'>Miasto</Link>
        <Link to='/przywileje' onClick={handleClick} className='sidemenu-link'>Przywileje</Link>  
        <Link to='/status-dostawy' onClick={handleClick} className='sidemenu-link'>Status Dostawy</Link>
        <Link to='/status-transakcji' onClick={handleClick} className='sidemenu-link'>Status Transakcji</Link>  
        <Link to='/status-wypozyczenia' onClick={handleClick} className='sidemenu-link'>Status Wypożyczenia</Link> 
        <Link to='/status-zamowienia' onClick={handleClick} className='sidemenu-link'>Status Zamówienia</Link>
        <Link to='/translator' onClick={handleClick} className='sidemenu-link'>Translator</Link>
        <Link to='/typ-adresu' onClick={handleClick} className='sidemenu-link'>Typ Adresu</Link>
        <Link to='/typ-wypozyczenia' onClick={handleClick} className='sidemenu-link'>Typ Wypożyczenia</Link>       
        <Link to='/wydawnictwo' onClick={handleClick} className='sidemenu-link'>Wydawnictwo</Link>
    </div>
  )
}

export default DictionaryLinks
