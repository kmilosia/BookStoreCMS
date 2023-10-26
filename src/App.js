import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Book,Author,City,Country, Home,RentalStatus, DeliveryStatus,FooterColumns,FooterLinks, Login,AccountStatus,Availability,Category,Edition,FileFormat,Gender,OrderStatus,ShippingStatus,TransactionStatus, Language, PaymentMethod, DeliveryMethod, PageNotFound, Publisher, Permission, Form, Translator, Image, RentalType, BookItem, Discount, DiscountCode, Account, StockAmount, Customer } from './import'
import { useState } from 'react';
import { Layout } from './Layout';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  return (
     
      <Router>
        <Routes>
          {/* <Route path='/' element={<Navigate to={isLogged ? '/dashboard' : '/login'} replace/>}/> */}
          <Route path='/' element={<Navigate to={ '/dashboard'}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Home />}/>
            <Route path='/autor' element={<Author />}/>
            <Route path='/konto' element={<Account />}/>
            <Route path='/ksiazka' element={<Book />}/>         
            <Route path='/miasto' element={<City />}/>         
            <Route path='/jezyk' element={<Language />}/>         
            <Route path='/kraj' element={<Country />}/>         
            <Route path='/egzemplarz' element={<BookItem />}/>         
            <Route path='/status-konta' element={<AccountStatus />}/>
            <Route path='/przywileje' element={<Permission />}/>
            <Route path='/dostepnosc' element={<Availability />}/>
            <Route path='/kategoria' element={<Category />}/>
            <Route path='/promocja' element={<Discount />}/>
            <Route path='/kod-rabatowy' element={<DiscountCode />}/>
            <Route path='/edycja-ksiazki' element={<Edition />}/>
            <Route path='/format-pliku' element={<FileFormat />}/>
            <Route path='/format' element={<Form />}/>
            <Route path='/zdjecie' element={<Image />}/>
            <Route path='/translator' element={<Translator />}/>
            <Route path='/plec' element={<Gender />}/>
            <Route path='/wydawnictwo' element={<Publisher />}/>
            <Route path='/status-zamowienia' element={<OrderStatus />}/>
            <Route path='/status-wypozyczenia' element={<RentalStatus />}/>
            <Route path='/typ-wypozyczenia' element={<RentalType />}/>
            <Route path='/status-wysylki' element={<ShippingStatus />}/>
            <Route path='/status-transakcji' element={<TransactionStatus />}/>
            <Route path='/metoda-platnosci' element={<PaymentMethod />}/>
            <Route path='/forma-dostawy' element={<DeliveryMethod />}/>
            <Route path='/status-dostawy' element={<DeliveryStatus />}/>
            <Route path='/footer-kolumna' element={<FooterColumns />}/>
            <Route path='/footer-link' element={<FooterLinks />}/>
            <Route path='/magazyn' element={<StockAmount />}/>
            <Route path='/klient' element={<Customer />}/>

            <Route path='*' element={<PageNotFound />}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
