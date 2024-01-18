import React from 'react'
import ManageContentElement from '../components/dashboard/ManageContentElement';
import HeaderElement from '../components/dashboard/HeaderElement';
import WeeklyOverviewElement from '../components/dashboard/WeeklyOverviewElement';

function Home() {
  return (
    <div className='main-wrapper overflow-y-auto page-scrollbar pr-5'>
      <div className='flex flex-col'>
        <HeaderElement />
        <WeeklyOverviewElement />
        <h3 className='home-element-header'>Zarządzaj sklepem internetowym</h3>
        <div className='grid grid-cols-4 gap-5 w-full mt-2'>         
          <ManageContentElement path="/promocja" imgURL="https://iili.io/Jo1fKT7.png" title="Promocje" content='Dodaj nową promocję lub zarządzaj obecnymi promocjami.' />
          <ManageContentElement path="/ksiazka" imgURL="https://iili.io/Jo1Io7a.png" title="Książki" content='Dodaj nową książkę bazową a następnie dodaj egzemplarze książki.' />
          <ManageContentElement path="/egzemplarz" imgURL="https://iili.io/Jo1Izmv.png" title="Egzemplarze książek" content='Dodaj egzemplarz książki, jeżeli książka ma różne formy dodaj oddzielny egzemplarz dla każdej.' />
          <ManageContentElement path="/wiadomosci" imgURL="https://iili.io/JIoEFcl.png" title="Wiadomości" content='Dodawaj wiadomości ze świata książek aby nasi czytelnicy zagłębili się w ten świat.' />
          <ManageContentElement path="/newsletter" imgURL="https://iili.io/JIlY4S9.png" title="Newsletter" content='Przesyłaj zapisanym osobom newslettery aby byli na bieżąco z tym co się dzieje w naszym sklepie.' />
          <ManageContentElement path="/uzytkownik" imgURL="https://iili.io/Jo1IBrF.png" title="Klienci" content='Zarządzaj klientami naszej internetowej księgarni.' />
          <ManageContentElement path="/magazyn" imgURL="https://iili.io/Jo1Indg.png" title="Stan magazynu" content='Zarządzaj stanem naszego magazynu - zmień ilość dostępnych na magazynie książek.' />
          <ManageContentElement path="/strona-klienta" imgURL="https://iili.io/Jo1IxkJ.png" title="Strona internetowa" content='Zarządzaj elementami strony internetowej naszego sklepu.' />
          <ManageContentElement path="/slownik" imgURL="https://iili.io/Jo1ITIR.png" title="Słownik" content='Dodawaj nowe elementy do naszej tabeli słownikowej używanej zarówno w naszym CMS jak i w sklepie internetowym.' />
        </div>
      </div>
    </div>
  )
}

export default Home
