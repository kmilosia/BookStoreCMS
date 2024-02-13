import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Book,Author,City,Country,Dictionary, Home,RentalStatus, DeliveryStatus,FooterColumns,FooterLinks, Login,Availability,Category,Edition,FileFormat,OrderStatus,TransactionStatus, Language, PaymentMethod, DeliveryMethod, PageNotFound, Publisher, Permission, Form, Translator, Image, RentalType, BookItem, Discount, DiscountCode, Account, StockAmount, Supplier, AddressType, WebsiteLayout, Banner, NavbarLink, CategoryElement, DiscountsBanner, News, Newsletter, Supply, BookItemReview, Contact, Score, Order, Access, RecoverPassword, NewPassword, Roles, Employee, ClaimValues, Claims, RoleClaims } from './import'
import { useEffect } from 'react';
import { Layout } from './Layout';
import Splash from './pages/Splash';
import { useAuthStore } from './store/authStore';
import Message from './modules/Message';
import { jwtDecode } from 'jwt-decode';

function App() {
  // const newtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRkb2IxMTEiLCJuYW1laWQiOiI1ODEzOGNiZC01NDlmLTRmZDYtYjNjZS1hN2IwYTMxNmRiNzciLCJqdGkiOiI4ODNkMDc1Zi1kMDU3LTQxNGQtYTE3NS0zMDgzOTBhNDFhMDYiLCJSYXBvcnQiOiIxNSIsIkNNUyI6WyJyIiwidyJdLCJBdXRob3IiOiJyIiwiQm9va0l0ZW1zIjpbInIiLCJ3IiwiZSJdLCJuYmYiOjE3MDc3NjQ5NTAsImV4cCI6MjA2Nzc2NDk1MCwiaWF0IjoxNzA3NzY0OTUwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0NyJ9.pg7GqTno_p5-fyyFzNTGiaSMxSCsYPskc5F9a2Xg22c"
  // const payload = jwtDecode(newtoken)
  const token = useAuthStore((state) => state.token)
  const decodedToken = useAuthStore((state) => state.decodedToken)
  const restoring = useAuthStore((state) => state.restoring)
  const restoreToken = useAuthStore((state) => state.restoreToken)
  useEffect(() => {
    restoreToken()
  },[])
  useEffect(() => {
    console.log(decodedToken);
  },[decodedToken])

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
            {/* {payload.Author && Array.isArray(payload.Author) ? (
              payload.Author.map((item, index) => {
                if (item === 'r') {
                  return <Route key={index} path='/autor' element={<Author />} />;
                } else {
                  return null
                }
              })
            ) : (
              payload?.Author === 'r' ? (
                <>
                  <Route path='/autor' element={<Author />} />
                </>
              ) : (
                <>
                  {console.log(payload.Author)}
                </>
              )
            )}           */}
            {/* <Route path='/autor' element={<Author />}/> */}
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
            <Route path='/role' element={<Roles />}/>
            <Route path='/pracownik' element={<Employee />}/>
            <Route path='/wartosci-uprawnien' element={<ClaimValues />}/>
            <Route path='/widoki-uprawnien' element={<Claims />}/>
            <Route path='/uprawnienia-dostepu' element={<RoleClaims />}/>
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
