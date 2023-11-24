import React from 'react'
import {GiBookCover, GiCalendar, GiCardboardBoxClosed } from 'react-icons/gi'
import ManageContentElement from '../components/dashboard/ManageContentElement';
import SalesOverviewElement from '../components/dashboard/SalesOverviewElement';
import RentalOverviewElement from '../components/dashboard/RentalOverviewElement';
import ReservationOverviewElement from '../components/dashboard/ReservationOverviewElement';


function Home() {
  return (
    <div className='main-wrapper overflow-y-auto page-scrollbar pr-5'>
      <div className='flex flex-col'>
        <div className='flex w-full rounded-md bg-white dark:bg-dracula-700 px-10 py-10 shadow-md my-2'>
          <div className='w-full grid grid-cols-[3fr_1fr] py-5 relative'>
          <div className='flex flex-col justify-center dark:text-white'>
            <h1 className=' text-4xl font-semibold'>Witaj, Hannah Montana</h1>
            <p className='text-xl my-2 font-light'>Rozpocznij swój dzień produktywnie!</p>
          </div>
          <div className='w-full relative'>
          <img src='https://iili.io/Jo0Q6ga.png' className='absolute top-1/3 transform -translate-y-1/2 w-full h-auto object-contain'/>
          </div>
          </div>
        </div>
        <h1 className=' text-lg font-semibold text-dracula-500 dark:text-dracula-400 mt-3'>Podsumowanie tygodnia</h1>
        <div className='grid grid-cols-3 gap-3 my-2'>
          <SalesOverviewElement />
          <RentalOverviewElement />
          <ReservationOverviewElement />
        </div>
        <h1 className=' text-lg font-semibold text-dracula-500 dark:text-dracula-400 mt-3'>Zarządzaj sklepem internetowym</h1>
        <div className='flex flex-col w-full'>         

          <ManageContentElement path="/promocja" imgURL="https://iili.io/Jo1fKT7.png" title="Dodaj nową promocję" content='Dodaj zaplanowaną lub obecnie obowiązującą promocję na wybrane produkty.' />
          <ManageContentElement path="/ksiazka" imgURL="https://iili.io/Jo1Io7a.png" title="Dodaj książkę" content='Dodaj nową książkę bazową a następnie dodaj egzemplarze książki.' />
          <ManageContentElement path="/egzemplarz" imgURL="https://iili.io/Jo1Izmv.png" title="Dodaj egzemplarz książki" content='Dodaj egzemplarz książki, jeżeli książka ma różne formy dodaj oddzielny egzemplarz dla każdej.' />
          <ManageContentElement path="/uzytkownik" imgURL="https://iili.io/Jo1IBrF.png" title="Zarządzaj klientem" content='Zarządzaj klientem naszej internetowej księgarni.' />
          <ManageContentElement path="/magazyn" imgURL="https://iili.io/Jo1Indg.png" title="Zarządzaj stanem magazynu" content='Zarządzaj stanem naszego magazynu - zmień ilość dostępnych na magazynie książek.' />
          <ManageContentElement path="/footer-link" imgURL="https://iili.io/Jo1IxkJ.png" title="Zarządzaj stroną" content='Zarządzaj elementami strony internetowej naszego sklepu.' />
          <ManageContentElement path="/slownik" imgURL="https://iili.io/Jo1ITIR.png" title="Zarządzaj tabelami słownikowymi" content='Dodawaj nowe elementy do naszej tabeli słownikowej używanej zarówno w naszym CMS jak i w sklepie internetowym.' />
          
        </div>
      </div>
    </div>
  )
}

export default Home
