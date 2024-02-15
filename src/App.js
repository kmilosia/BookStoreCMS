import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Book,Author,City,Country, Home,RentalStatus, DeliveryStatus,FooterColumns,FooterLinks, Login,Availability,Category,Edition,FileFormat,OrderStatus,TransactionStatus, Language, PaymentMethod, DeliveryMethod, PageNotFound, Publisher, Form, Translator, Image, RentalType, BookItem, Discount, DiscountCode, Account, StockAmount, Supplier, AddressType, Banner, NavbarLink, CategoryElement, DiscountsBanner, News, Newsletter, Supply, BookItemReview, Contact, Score, Order, Access, Roles, Employee, ClaimValues, Claims, RoleClaims } from './import'
import { useEffect } from 'react';
import { Layout } from './Layout';
import Splash from './pages/Splash';
import { useAuthStore } from './store/authStore';
import Message from './modules/Message';

function App() {
  const token = useAuthStore((state) => state.token)
  const decodedToken = useAuthStore((state) => state.decodedToken)
  const restoring = useAuthStore((state) => state.restoring)
  const restoreToken = useAuthStore((state) => state.restoreToken)
  const generatePermissionRoute = (attribute,path, component) => {
    return (decodedToken?.[attribute]?.includes('r') || decodedToken?.role === 'Admin') && <Route path={path} element={component} />
  }
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
          </Route>
          :
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='/konto' element={<Account />}/>
            {generatePermissionRoute('Author', '/autor', <Author />)}
            {generatePermissionRoute('Book', '/ksiazka', <Book />)}
            {generatePermissionRoute('City', '/miasto', <City />)}
            {generatePermissionRoute('Language', '/jezyk', <Language />)}
            {generatePermissionRoute('Country', '/kraj', <Country />)}
            {generatePermissionRoute('BookItems', '/egzemplarz', <BookItem />)}
            {generatePermissionRoute('AddressType', '/typ-adresu', <AddressType />)}
            {generatePermissionRoute('Availability', '/dostepnosc', <Availability />)}
            {generatePermissionRoute('Category', '/kategoria', <Category />)}
            {generatePermissionRoute('Discount', '/promocja', <Discount />)}
            {generatePermissionRoute('DiscountCodes', '/kod-rabatowy', <DiscountCode />)}
            {generatePermissionRoute('Edition', '/edycja-ksiazki', <Edition />)}
            {generatePermissionRoute('FileFormat', '/format-pliku', <FileFormat />)}
            {generatePermissionRoute('Form', '/format', <Form />)}
            {generatePermissionRoute('Images', '/zdjecie', <Image />)}
            {generatePermissionRoute('Translator', '/translator', <Translator />)}
            {generatePermissionRoute('Supply', '/dostawa', <Supply />)}
            {generatePermissionRoute('Supplier', '/dostawca', <Supplier />)}
            {generatePermissionRoute('OrderStatus', '/status-zamowienia', <OrderStatus />)}
            {generatePermissionRoute('RentalStatus', '/status-wypozyczenia', <RentalStatus />)}
            {generatePermissionRoute('RentalType', '/typ-wypozyczenia', <RentalType />)}
            {generatePermissionRoute('TransactionStatus', '/status-transakcji', <TransactionStatus />)}
            {generatePermissionRoute('PaymentMethod', '/metoda-platnosci', <PaymentMethod />)}
            {generatePermissionRoute('DeliveryMethod', '/metoda-dostawy', <DeliveryMethod />)}
            {generatePermissionRoute('DeliveryStatus', '/status-dostawy', <DeliveryStatus />)}
            {generatePermissionRoute('FooterColumns', '/footer-kolumna', <FooterColumns />)}
            {generatePermissionRoute('FooterLinks', '/footer-link', <FooterLinks />)}
            {generatePermissionRoute('StockAmount', '/stan-magazynu', <StockAmount />)}
            {generatePermissionRoute('Publisher', '/wydawnictwo', <Publisher />)}
            {generatePermissionRoute('News', '/wiadomosci', <News />)}
            {generatePermissionRoute('Banner', '/baner', <Banner />)}
            {generatePermissionRoute('BookItems', '/recenzja', <BookItemReview />)}
            {generatePermissionRoute('NavBarMenuLinks', '/navbar-link', <NavbarLink />)}
            {generatePermissionRoute('Newsletter', '/newsletter', <Newsletter />)}
            {generatePermissionRoute('CategoryElement', '/element-kategorii', <CategoryElement />)}
            {generatePermissionRoute('DiscountBanner', '/baner-promocyjny', <DiscountsBanner />)}
            {generatePermissionRoute('Contact', '/kontakt', <Contact />)}
            {generatePermissionRoute('Score', '/ocena', <Score />)}
            {generatePermissionRoute('Order', '/zamowienie', <Order />)}
            {generatePermissionRoute('Roles', '/role', <Roles />)}
            {generatePermissionRoute('Employee', '/pracownik', <Employee />)}
            {decodedToken?.role === 'Admin' &&
            <>
            <Route path='/role' element={<Roles />}/>
            <Route path='/pracownik' element={<Employee />}/>
            <Route path='/wartosci-uprawnien' element={<ClaimValues />}/>
            <Route path='/widoki-uprawnien' element={<Claims />}/>
            <Route path='/uprawnienia-dostepu' element={<RoleClaims />}/>
            </>
            }
          </Route>
          }
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </Router>
      </>
  )
}

export default App;
