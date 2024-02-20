import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiBook,BiBox, BiSolidDashboard} from 'react-icons/bi'
import {AiOutlineClose,AiOutlineMessage } from 'react-icons/ai'
import {FaRegImage} from 'react-icons/fa'
import {CgWebsite} from 'react-icons/cg'
import {PiBooks} from 'react-icons/pi'
import {MdOutlineDiscount,MdOutlineAccountCircle, MdOutlineNewspaper, MdOutlineAdminPanelSettings} from 'react-icons/md'
import { FaRegNewspaper } from "react-icons/fa6"
import {BsMoonStarsFill, BsSunFill} from 'react-icons/bs'
import { checkTheme } from '../utils/theme'
import {GiSecretBook} from 'react-icons/gi'
import DictionaryLinks from './links/DictionaryLinks'
import ClientAppLinks from './links/ClientAppLinks'
import LogoutButton from './buttons/LogoutButton'
import SidebarAccountElement from './SidebarAccountElement'
import StockLinks from './links/StockLinks'
import BooksLinks from './links/BooksLinks'
import DiscountsLinks from './links/DiscountsLinks'
import { FiPackage } from 'react-icons/fi'
import AdminLinks from './links/AdminLinks'
import { useAuthStore } from '../store/authStore'

function Sidebar() {
  const decodedToken = useAuthStore((state) => state.decodedToken)
  const [isDarkTheme, setIsDarkTheme] = useState(checkTheme())
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false)
  const [sideMenu, setSideMenu] = useState(null)
  const handleLinkClick = () => {
    setIsSideMenuExpanded(false)
  }
  const toggleSideMenu = (menu) => {
    if(isSideMenuExpanded && sideMenu === menu){
      setIsSideMenuExpanded(false)
      setSideMenu(null)
    }else{
    setSideMenu(menu)
    setIsSideMenuExpanded(true)
    }
  }
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem('color-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className='flex flex-row max-h-screen w-auto'>
    <div className='bg-dracula-100 max-h-full w-max grid grid-rows-[max-content_auto_max-content] text-dracula-900 dark:text-dracula-100 dark:bg-dracula-700'>
      <div className='flex flex-row items-center justify-between border-b-[1px] mb-2 dark:border-dracula-600 px-2 py-3'>
        <Link to='/' className='flex flex-row items-center p-1 transition-all text-purple-500 hover:text-purple-600'>
          <GiSecretBook className='text-3xl mx-1'/>
          <h1 className='text-lg font-semibold font-logo self-end'>Spellarium</h1>
        </Link> 
      </div>

      <div className='flex flex-col h-full pl-3 pr-10 py-2 my-0 overflow-y-auto overflow-x-hidden sidebar-scrollbar mr-2 justify-start'>
        {(decodedToken?.Author?.includes('r') || decodedToken?.Availability?.includes('r') || decodedToken?.Edition?.includes('r') ||
        decodedToken?.Form?.includes('r') || decodedToken?.FileFormat?.includes('r') || decodedToken?.Language?.includes('r') ||
        decodedToken?.Category?.includes('r') || decodedToken?.Country?.includes('r') || decodedToken?.PaymentMethod?.includes('r') ||
        decodedToken?.DeliveryMethod?.includes('r') || decodedToken?.City?.includes('r') || decodedToken?.Score?.includes('r') ||
        decodedToken?.DeliveryStatus?.includes('r') || decodedToken?.TransactionsStatus?.includes('r') || decodedToken?.RentalStatus?.includes('r') ||
        decodedToken?.OrderStatus?.includes('r') || decodedToken?.Translator?.includes('r') || decodedToken?.AddressType?.includes('r') ||
        decodedToken?.RentalType?.includes('r') || decodedToken?.Publisher?.includes('r') || decodedToken?.role === 'Admin') && 
        <button onClick={() => toggleSideMenu("dictionary")} className='default-link'>
          <div className='flex flex-row items-center'>
            <BiBook className='text-xl mx-1'/>
            <span>Słownik</span>
          </div>
        </button>}
        {(decodedToken?.Book?.includes('r') || decodedToken?.BookItems?.includes('r') || decodedToken?.role === 'Admin') && 
        <button onClick={() => toggleSideMenu("books")} className='default-link'>
          <div className='flex flex-row items-center'>
            <PiBooks className='text-xl mx-1'/>
            <span>Książki</span>
          </div>
        </button>}
        {(decodedToken?.StockAmount?.includes('r') || decodedToken?.Supply?.includes('r') ||
          decodedToken?.Supplier?.includes('r') || decodedToken?.role === 'Admin') && 
        <button onClick={() => toggleSideMenu("stock")} className='default-link'>
          <div className='flex flex-row items-center'>
            <BiBox className='text-xl mx-1'/>
            <span>Magazyn</span>
          </div>
        </button>}
        {(decodedToken?.News?.includes('r') || decodedToken?.role === 'Admin') && 
        <Link to="/wiadomosci" className='default-link'>
          <div className='flex flex-row items-center'>
            <FaRegNewspaper className='text-xl mx-1'/>
            <span>Wiadomości</span>
          </div>
        </Link>}
        {(decodedToken?.Images?.includes('r') || decodedToken?.role === 'Admin') && 
        <Link to="/zdjecie" className='default-link'>
          <div className='flex flex-row items-center'>
            <FaRegImage className='text-xl mx-1'/>
            <span>Zdjęcia</span>
          </div>
        </Link>}
        {(decodedToken?.Newsletter?.includes('r') || decodedToken?.role === 'Admin') && 
        <Link to="/newsletter" className='default-link'>
          <div className='flex flex-row items-center'>
            <MdOutlineNewspaper className='text-xl mx-1'/>
            <span>Newsletter</span>
          </div>
        </Link>}
        {(decodedToken?.DiscountCodes?.includes('r') || decodedToken?.Discount?.includes('r') ||
          decodedToken?.role === 'Admin') && 
        <button onClick={() => toggleSideMenu("discount")} className='default-link'>
          <div className='flex flex-row items-center'>
            <MdOutlineDiscount className='text-xl mx-1'/>
            <span>Promocje</span>
          </div>
        </button>}
        {(decodedToken?.FooterColumns?.includes('r') || decodedToken?.FooterLinks?.includes('r') ||
         decodedToken?.NavBarMenuLinks?.includes('r') || decodedToken?.Banner?.includes('r') ||
          decodedToken?.DiscountBanner?.includes('r') || decodedToken?.CategoryElement?.includes('r') ||
          decodedToken?.role === 'Admin') && 
        <button onClick={()=> toggleSideMenu("clientapp")} className='default-link'>
          <div className='flex flex-row items-center'>
            <CgWebsite className='text-xl mx-1'/>
            <span className='whitespace-nowrap'>Strona WWW</span>
          </div>
        </button>}
        {(decodedToken?.Contact?.includes('r') || decodedToken?.role === 'Admin') && 
        <Link to="/kontakt" className='default-link'>
          <div className='flex flex-row items-center'>
            <AiOutlineMessage className='text-xl mx-1'/>
            <span>Kontakt</span>
          </div>
        </Link>}  
        {(decodedToken?.Order?.includes('r') || decodedToken?.role === 'Admin') && 
        <Link to="/zamowienie" className='default-link'>
          <div className='flex flex-row items-center'>
            <FiPackage className='text-xl mx-1'/>
            <span>Zamówienia</span>
          </div>
        </Link>}  
        {decodedToken?.role === 'Admin' &&
        <button onClick={()=> toggleSideMenu("adminpanel")} className='default-link'>
          <div className='flex flex-row items-center'>
            <MdOutlineAdminPanelSettings className='text-xl mx-1'/>
            <span className='whitespace-nowrap'>Panel admina</span>
          </div>
        </button>    
        }   
      </div>
      <div className='flex flex-col mt-2'>
      <div className='flex flex-col px-3 py-4 border-t-[1px] dark:border-dracula-600'>
        <Link to='/' className='flex flex-row items-center py-1 hover:text-purple-500'><BiSolidDashboard className='text-xl mx-2'/><span>Dashboard</span></Link>
        <Link to='/konto' className='flex flex-row items-center py-1 hover:text-purple-500'><MdOutlineAccountCircle className='text-xl mx-2'/><span>Konto</span></Link>
        <button onClick={toggleTheme} id='theme-toggle' type='button' className='flex flex-row items-center py-1 hover:text-purple-500'>
          {isDarkTheme ? <><BsMoonStarsFill className='text-lg mx-2'/><span>Tryb nocny</span></> : <><BsSunFill className='text-xl mx-2'/><span>Tryb dzienny</span></>}
        </button>
        <LogoutButton />
      </div>
       <SidebarAccountElement />
      </div>

    </div>
    
    {isSideMenuExpanded &&
    <div className='grid grid-rows-[max-content_auto_max-content] max-h-screen px-4 py-2 border-l-[1px] w-max text-dracula-900 dark:text-dracula-100 dark:border-dracula-600 dark:bg-dracula-700'>
          {sideMenu === 'dictionary' ? 
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold'>Słownik</h1>
          </div>
          <DictionaryLinks handleLinkClick={handleLinkClick}/> 
          </>
          : sideMenu === "clientapp" ?
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold whitespace-nowrap'>Strona WWW</h1>
          </div>
          <ClientAppLinks handleLinkClick={handleLinkClick}/>
          </>
          : sideMenu === "stock" ?
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold whitespace-nowrap'>Magazyn</h1>
          </div>
          <StockLinks handleLinkClick={handleLinkClick}/>
          </>
          : sideMenu === "books" ?
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold whitespace-nowrap'>Książki</h1>
          </div>
          <BooksLinks handleLinkClick={handleLinkClick}/>
          </>
          : sideMenu === "adminpanel" ?
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold whitespace-nowrap'>Panel admina</h1>
          </div>
          <AdminLinks handleLinkClick={handleLinkClick}/>
          </>
          : sideMenu === "discount" ?
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold whitespace-nowrap'>Promocje</h1>
          </div>
          <DiscountsLinks handleLinkClick={handleLinkClick}/>
          </>
           : ""}
          <div className='w-full flex justify-center pt-4 pb-2'>
          <button className='flex justify-end' onClick={() => setIsSideMenuExpanded(false)}><AiOutlineClose className='text-xl transition-all text-dracula-500 hover:text-dracula-600 dark:hover:text-dracula-400'/></button>
          </div>
    </div>
    }

    </div>
  )
}

export default Sidebar
