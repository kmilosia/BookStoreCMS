import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Book,Author,City,Country, Home,RentalStatus, Login,AccountStatus,Availability,Category,Edition,FileFormat,BookForm,Gender,OrderStatus,ShippingStatus,TransactionStatus, Address, Language, PaymentMethod, DeliveryMethod, PageNotFound, Publisher, Permission } from './import'
import { useState } from 'react';
import { Layout } from './Layout';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  return (
     
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={isLogged ? '/dashboard' : '/login'} replace/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Home />}/>
            <Route path='/author' element={<Author />}/>
            <Route path='/address' element={<Address />}/>
            <Route path='/book' element={<Book />}/>         
            <Route path='/city' element={<City />}/>         
            <Route path='/language' element={<Language />}/>         
            <Route path='/country' element={<Country />}/>         
            <Route path='/account-status' element={<AccountStatus />}/>
            <Route path='/permission' element={<Permission />}/>
            <Route path='/availability' element={<Availability />}/>
            <Route path='/category' element={<Category />}/>
            <Route path='/edition' element={<Edition />}/>
            <Route path='/file-format' element={<FileFormat />}/>
            <Route path='/form' element={<BookForm />}/>
            <Route path='/gender' element={<Gender />}/>
            <Route path='/publisher' element={<Publisher />}/>
            <Route path='/order-status' element={<OrderStatus />}/>
            <Route path='/rental-status' element={<RentalStatus />}/>
            <Route path='/shipping-status' element={<ShippingStatus />}/>
            <Route path='/transaction-status' element={<TransactionStatus />}/>
            <Route path='/payment-method' element={<PaymentMethod />}/>
            <Route path='/delivery-method' element={<DeliveryMethod />}/>

            <Route path='*' element={<PageNotFound />}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
