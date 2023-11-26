import React from 'react'
import ManageContentElement from '../components/dashboard/ManageContentElement';
import SalesOverviewElement from '../components/dashboard/SalesOverviewElement';
import RentalOverviewElement from '../components/dashboard/RentalOverviewElement';
import ReservationOverviewElement from '../components/dashboard/ReservationOverviewElement';
import HeaderElement from '../components/dashboard/HeaderElement';

function Home() {
  return (
    <div className='main-wrapper overflow-y-auto page-scrollbar pr-5'>
      <div className='flex flex-col'>
        <HeaderElement />
        <h3 className='home-element-header'>Podsumowanie tygodnia</h3>
        <div className='grid grid-cols-3 gap-3 my-2'>
          <SalesOverviewElement />
          <RentalOverviewElement />
          <ReservationOverviewElement />
        </div>
        <h3 className='home-element-header'>Zarządzaj sklepem internetowym</h3>
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
