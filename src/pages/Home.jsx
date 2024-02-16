import React from 'react'
import ManageContentElement from '../components/dashboard/ManageContentElement';
import HeaderElement from '../components/dashboard/HeaderElement';
import WeeklyOverviewElement from '../components/dashboard/WeeklyOverviewElement';
import { useAuthStore } from '../store/authStore';
import MonthlyReport from '../components/dashboard/MonthlyReport';

function Home() {
  const decodedToken = useAuthStore((state) => state.decodedToken)
  return (
    <div className='main-wrapper overflow-y-auto page-scrollbar pr-5'>
      <div className='flex flex-col'>
        <HeaderElement />
        {(decodedToken?.CMS?.includes('r') || decodedToken?.role === 'Admin') &&                                   
        <WeeklyOverviewElement />}
         {(decodedToken?.CMS?.includes('r') || decodedToken?.role === 'Admin') &&                                   
        <MonthlyReport />}
        {(decodedToken?.Discount?.includes('r') || decodedToken?.Book?.includes('r') || decodedToken?.BookItems?.includes('r') || 
        decodedToken?.News?.includes('r') || decodedToken?.Newsletter?.includes('r') ||decodedToken?.Images?.includes('r') ||  decodedToken?.role === 'Admin') &&                                         
        <h3 className='home-element-header'>Zarządzaj sklepem internetowym</h3>}
        <div className='grid grid-cols-3 gap-5 w-full mt-2'>  
          <ManageContentElement attribute="Discount" path="/promocja" imgURL="https://iili.io/Jo1fKT7.png" title="Promocje" content='Dodaj nową promocję lub zarządzaj obecnymi promocjami.' />
          <ManageContentElement attribute="Book" path="/ksiazka" imgURL="https://iili.io/Jo1Io7a.png" title="Książki" content='Dodaj nową książkę bazową a następnie dodaj egzemplarze książki.' />
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
