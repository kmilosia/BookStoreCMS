import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Book,Author,City,Country,Dictionary, Home,RentalStatus, DeliveryStatus,FooterColumns,FooterLinks, Login,Availability,Category,Edition,FileFormat,OrderStatus,TransactionStatus, Language, PaymentMethod, DeliveryMethod, PageNotFound, Publisher, Permission, Form, Translator, Image, RentalType, BookItem, Discount, DiscountCode, Account, StockAmount, Supplier, AddressType, WebsiteLayout, Banner, NavbarLink, CategoryElement, DiscountsBanner, News, Newsletter, Supply, BookItemReview, Contact, Score, Order, Access, RecoverPassword, NewPassword } from './import'
import { useEffect } from 'react';
import { Layout } from './Layout';
import Splash from './pages/Splash';
import { useAuthStore } from './store/authStore';
import Message from './modules/Message';

function App() {
  const token = useAuthStore((state) => state.token)
  const restoring = useAuthStore((state) => state.restoring)
  const restoreToken = useAuthStore((state) => state.restoreToken)
  useEffect(() => {
    restoreToken()
  },[])
  return (
    restoring ? <Splash /> :
    <>
    <Message />
      <Router>
        <Routes>
          {token === null ?
          <Route path='/' element={<Access/>}>
            <Route index element={<Login />}/>
            <Route path='/resetuj-haslo' element={<RecoverPassword/>}/>
            <Route path='/dostep/odzyskaj-konto/resetuj-haslo' element={<NewPassword/>}/>
          </Route>
          :
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='/autor' element={<Author />}/>
            <Route path='/slownik' element={<Dictionary />}/>
            <Route path='/konto' element={<Account />}/>
            <Route path='/ksiazka' element={<Book />}/>         
            <Route path='/miasto' element={<City />}/>         
            <Route path='/jezyk' element={<Language />}/>         
            <Route path='/kraj' element={<Country />}/>         
            <Route path='/egzemplarz' element={<BookItem />}/>         
            <Route path='/typ-adresu' element={<AddressType />}/>
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
            <Route path='/wydawnictwo' element={<Publisher />}/>
            <Route path='/dostawa' element={<Supply />}/>
            <Route path='/dostawca' element={<Supplier />}/>
            <Route path='/status-zamowienia' element={<OrderStatus />}/>
            <Route path='/status-wypozyczenia' element={<RentalStatus />}/>
            <Route path='/typ-wypozyczenia' element={<RentalType />}/>
            <Route path='/status-transakcji' element={<TransactionStatus />}/>
            <Route path='/metoda-platnosci' element={<PaymentMethod />}/>
            <Route path='/metoda-dostawy' element={<DeliveryMethod />}/>
            <Route path='/status-dostawy' element={<DeliveryStatus />}/>
            <Route path='/footer-kolumna' element={<FooterColumns />}/>
            <Route path='/footer-link' element={<FooterLinks />}/>
            <Route path='/stan-magazynu' element={<StockAmount />}/>
            <Route path='/wiadomosci' element={<News />}/>
            <Route path='/baner' element={<Banner />}/>
            <Route path='/recenzja' element={<BookItemReview />}/>
            <Route path='/navbar-link' element={<NavbarLink />}/>
            <Route path='/newsletter' element={<Newsletter />}/>
            <Route path='/element-kategorii' element={<CategoryElement />}/>
            <Route path='/baner-promocyjny' element={<DiscountsBanner />}/>
            <Route path='/kontakt' element={<Contact />}/>
            <Route path='/ocena' element={<Score />}/>
            <Route path='/zamowienie' element={<Order />}/>
            <Route path='/strona-klienta' element={<WebsiteLayout />}/>
          </Route>
          }
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </Router>
      </>
  )
}

export default App;
