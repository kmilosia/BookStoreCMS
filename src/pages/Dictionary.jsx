import React from 'react'
import DictionaryLink from '../components/links/DictionaryLink'

function Dictionary() {
  return (
    <div className='main-wrapper overflow-y-auto page-scrollbar'>
        <h1 className='main-header'>Słownik</h1>    
        <div className='flex flex-col'>
            <DictionaryLink title="Autor" path='/autor' />
            <DictionaryLink title="Dostępność" path='/dostepnosc' />
            <DictionaryLink title="Edycja książki" path='/edycja-ksiazki' />
            <DictionaryLink title="Forma dostawy" path='/forma-dostawy' />
            <DictionaryLink title="Format książki" path='/format' />
            <DictionaryLink title="Format pliku" path='/format-pliku' />
            <DictionaryLink title="Język" path='/jezyk' />
            <DictionaryLink title="Kategoria" path='/kategoria' />
            <DictionaryLink title="Kraj" path='/kraj' />
            <DictionaryLink title="Metoda płatności" path='/metoda-platnosci' />
            <DictionaryLink title="Miasto" path='/miasto' />
            <DictionaryLink title="Płeć" path='/plec' />
            <DictionaryLink title="Przywileje" path='/przywileje' />
            <DictionaryLink title="Status dostawy" path='/status-dostawy' />
            <DictionaryLink title="Status konta" path='/status-konta' />
            <DictionaryLink title="Status transakcji" path='/status-transakcji' />
            <DictionaryLink title="Status wypożyczenia" path='/status-wypozyczenia' />
            <DictionaryLink title="Status wysyłki" path='/status-wysyłki' />
            <DictionaryLink title="Status zamówienia" path='/status-zamówienia' />
            <DictionaryLink title="Translator" path='/translator' />
            <DictionaryLink title="Typ adresu" path='/typ-adresu' />
            <DictionaryLink title="Typ wypożyczenia" path='/typ-wypozyczenia' />
            <DictionaryLink title="Wydawnictwo" path='/wydawnictwo' />
         </div>
    </div>
  )
}

export default Dictionary
