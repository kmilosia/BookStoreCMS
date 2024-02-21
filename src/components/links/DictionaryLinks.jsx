import React from 'react'
import SideLink from './SideLink'

function DictionaryLinks({handleLinkClick}) { 
  
  return (
    <div className='flex flex-col overflow-auto overflow-x-hidden px-2 py-1 sidebar-scrollbar my-2'>
        <SideLink handleLinkClick={handleLinkClick} attribute="Author" title="Autor" path="/autor" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Availability" title="Dostępność" path="/dostepnosc" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Edition" title="Edycja książki" path="/edycja-ksiazki" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Form" title="Format książki" path="/format" />
        <SideLink handleLinkClick={handleLinkClick} attribute="FileFormat" title="Format pliku" path="/format-pliku" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Language" title="Język" path="/jezyk" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Category" title="Kategorie" path="/kategoria" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Country" title="Kraj" path="/kraj" />
        <SideLink handleLinkClick={handleLinkClick} attribute="DeliveryMethod" title="Metoda dostawy" path="/metoda-dostawy" />
        <SideLink handleLinkClick={handleLinkClick} attribute="PaymentMethod" title="Metoda płatności" path="/metoda-platnosci" />
        <SideLink handleLinkClick={handleLinkClick} attribute="City" title="Miasto" path="/miasto" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Score" title="Ocena" path="/ocena" />
        <SideLink handleLinkClick={handleLinkClick} attribute="DeliveryStatus" title="Status Dostawy" path="/status-dostawy" />
        <SideLink handleLinkClick={handleLinkClick} attribute="TransactionsStatus" title="Status Transakcji" path="/status-transakcji" />
        <SideLink handleLinkClick={handleLinkClick} attribute="RentalStatus" title="Status Wypożyczenia" path="/status-wypozyczenia" />
        <SideLink handleLinkClick={handleLinkClick} attribute="OrderStatus" title="Status Zamówienia" path="/status-zamowienia" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Translator" title="Translator" path="/translator" />
        <SideLink handleLinkClick={handleLinkClick} attribute="AddressType" title="Typ Adresu" path="/typ-adresu" />
        <SideLink handleLinkClick={handleLinkClick} attribute="RentalType" title="Typ Wypożyczenia" path="/typ-wypozyczenia" />
        <SideLink handleLinkClick={handleLinkClick} attribute="Publisher" title="Wydawnictwo" path="/wydawnictwo" />
    </div>
  )
}

export default DictionaryLinks
