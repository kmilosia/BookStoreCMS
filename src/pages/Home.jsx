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
        <div className='grid grid-cols-3 gap-5 w-full mt-2'>         
          <ManageContentElement attribute="Discount" path="/promocja" imgURL="https://iili.io/Jo1fKT7.png" title="Promocje" content='Dodaj nową promocję lub zarządzaj obecnymi promocjami.' />
          <ManageContentElement attribute="Books" path="/ksiazka" imgURL="https://iili.io/Jo1Io7a.png" title="Książki" content='Dodaj nową książkę bazową a następnie dodaj egzemplarze książki.' />
          <ManageContentElement attribute="BookItems" path="/egzemplarz" imgURL="https://iili.io/Jo1Izmv.png" title="Egzemplarze książek" content='Dodaj egzemplarz książki, jeżeli książka ma różne formy dodaj oddzielny egzemplarz dla każdej.' />
          <ManageContentElement attribute="News" path="/wiadomosci" imgURL="https://iili.io/JIoEFcl.png" title="Wiadomości" content='Dodawaj wiadomości ze świata książek aby nasi czytelnicy zagłębili się w ten świat.' />
          <ManageContentElement attribute="Newsletter" path="/newsletter" imgURL="https://iili.io/JIlY4S9.png" title="Newsletter" content='Przesyłaj zapisanym osobom newslettery aby byli na bieżąco z tym co się dzieje w naszym sklepie.' />
          <ManageContentElement attribute="Images" path="/zdjecie" imgURL="https://iili.io/JEfjbsV.png" title="Zdjęcia" content='Edytuj zdjęcia użyte na naszej strone internetowej, CMS oraz w aplikacji mobilnej.' />
        </div>
      </div>
    </div>
  )
}

export default Home
