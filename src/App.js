import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Book,Author,City,Country, Home,RentalStatus, DeliveryStatus,FooterColumns,FooterLinks, Login,AccountStatus,Availability,Category,Edition,FileFormat,Gender,OrderStatus,ShippingStatus,TransactionStatus, Language, PaymentMethod, DeliveryMethod, PageNotFound, Publisher, Permission, Form, Translator, Image, RentalType, BookItem, Discount, DiscountCode, StockAmount } from './import'
import { useState } from 'react';
import { Layout } from './Layout';
import Payment from './pages/dictionary/Payment';

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
            <Route path='/author' element={<Author />}/>
            <Route path='/book' element={<Book />}/>         
            <Route path='/city' element={<City />}/>         
            <Route path='/language' element={<Language />}/>         
            <Route path='/country' element={<Country />}/>         
            <Route path='/payment' element={<Payment />}/>         
            <Route path='/book-item' element={<BookItem />}/>         
            <Route path='/account-status' element={<AccountStatus />}/>
            <Route path='/permission' element={<Permission />}/>
            <Route path='/availability' element={<Availability />}/>
            <Route path='/category' element={<Category />}/>
            <Route path='/discount' element={<Discount />}/>
            <Route path='/discount-code' element={<DiscountCode />}/>
            <Route path='/edition' element={<Edition />}/>
            <Route path='/file-format' element={<FileFormat />}/>
            <Route path='/form' element={<Form />}/>
            <Route path='/image' element={<Image />}/>
            <Route path='/translator' element={<Translator />}/>
            <Route path='/gender' element={<Gender />}/>
            <Route path='/publisher' element={<Publisher />}/>
            <Route path='/order-status' element={<OrderStatus />}/>
            <Route path='/rental-status' element={<RentalStatus />}/>
            <Route path='/rental-type' element={<RentalType />}/>
            <Route path='/shipping-status' element={<ShippingStatus />}/>
            <Route path='/stock-amount' element={<StockAmount />}/>
            <Route path='/transaction-status' element={<TransactionStatus />}/>
            <Route path='/payment-method' element={<PaymentMethod />}/>
            <Route path='/delivery-method' element={<DeliveryMethod />}/>
            <Route path='/delivery-status' element={<DeliveryStatus />}/>
            <Route path='/footer-columns' element={<FooterColumns />}/>
            <Route path='/footer-links' element={<FooterLinks />}/>

            <Route path='*' element={<PageNotFound />}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
