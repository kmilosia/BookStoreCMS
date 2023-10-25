import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiUser, BiPackage, BiBook, BiBookBookmark,BiBox} from 'react-icons/bi'
import {AiOutlineClose, AiOutlineLogout} from 'react-icons/ai'
import {TbDiscount2} from 'react-icons/tb'
import {FaBook,FaRegImage} from 'react-icons/fa'
import {CgWebsite} from 'react-icons/cg'
import {PiBooks} from 'react-icons/pi'
import {MdOutlineDiscount,MdOutlineAccountCircle} from 'react-icons/md'
import {BsMoonStarsFill, BsSunFill,BsPerson} from 'react-icons/bs'
import {FiSettings,FiLayout, FiMis} from 'react-icons/fi'
import hannahAvatar from '../assets/hannah.jpg'
import { checkTheme } from '../utils/theme'
import {GiSecretBook} from 'react-icons/gi'
import DictionaryLinks from './links/DictionaryLinks'
import ClientAppLinks from './links/ClientAppLinks'

function Sidebar() {
  const [isDarkTheme, setIsDarkTheme] = useState(checkTheme())
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false)
  const [sideMenu, setSideMenu] = useState(null)
  const toggleSideMenu = (menu) => {
    if(isSideMenuExpanded && sideMenu === menu){
      setIsSideMenuExpanded(false)
      setSideMenu(null)
    }
    else{
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

  const primaryLinkStyle = 'flex flex-row items-center hover:text-orange-500 py-2 justify-between px-1'

  return (
    <div className='flex flex-row max-h-screen w-auto'>

    <div style={{gridTemplateRows: 'max-content auto max-content'}} className='bg-dracula-100 max-h-full w-auto grid text-dracula-900 dark:text-dracula-100 dark:bg-dracula-700'>
      
      <div className='flex flex-row items-center justify-between border-b-[1px] mb-2 dark:border-dracula-600 px-2 py-3'>
        <Link className='flex flex-row items-center p-1 transition-all text-orange-600 hover:text-orange-700 dark:hover:text-orange-500'>
          <GiSecretBook className='text-3xl mx-1'/>
          <h1 className='text-lg font-semibold font-logo self-end'>Spellarium</h1>
        </Link> 
      </div>

      <div className='flex flex-col h-full pl-3 pr-10 py-2 my-0 overflow-y-auto overflow-x-hidden sidebar-scrollbar mr-2 justify-start'>
        <span className='text-xs text-dracula-500 dark:text-dracula-400 font-semibold my-1 mx-2'>OGÓLNE</span>

        <button onClick={() => toggleSideMenu("dictionary")} className={primaryLinkStyle}>
          <div className='flex flex-row items-center'>
            <BiBook className='text-xl mx-1'/>
            <span>Słownik</span>
          </div>
        </button>

        <Link to="/ksiazka" className={primaryLinkStyle}>
        <div className='flex flex-row items-center'>
            <BiBookBookmark className='text-xl mx-1'/>
            <span>Książka</span>
          </div>
        </Link>

        <Link to="/egzemplarz" className={primaryLinkStyle}>
        <div className='flex flex-row items-center'>
            <PiBooks className='text-xl mx-1'/>
            <span>Egzemplarz</span>
          </div>
        </Link>

        <Link to="/klient" className={primaryLinkStyle}>
        <div className='flex flex-row items-center'>
            <BiUser className='text-xl mx-1'/>
            <span>Klient</span>
          </div>
        </Link>

        <Link to="/zdjecie" className={primaryLinkStyle}>
        <div className='flex flex-row items-center'>
            <FaRegImage className='text-xl mx-1'/>
            <span>Zdjęcia</span>
          </div>
        </Link>

        <Link to="/promocja" className={primaryLinkStyle}>
        <div className='flex flex-row items-center'>
            <MdOutlineDiscount className='text-xl mx-1'/>
            <span>Promocja</span>
          </div>
        </Link>
        
        <Link to="/kod-rabatowy" className={primaryLinkStyle}>
        <div className='flex flex-row items-center'>
            <TbDiscount2 className='text-xl mx-1'/>
            <span className='whitespace-nowrap'>Kod Rabatowy</span>
          </div>
        </Link>

        <button onClick={()=> toggleSideMenu("clientapp")} className={primaryLinkStyle}>
          <div className='flex flex-row items-center'>
            <CgWebsite className='text-xl mx-1'/>
            <span className='whitespace-nowrap'>Strona Klienta</span>
          </div>
        </button>
               

      </div>
      <div className='flex flex-col mt-2'>
      <div className='flex flex-col px-3 py-4 border-t-[1px] dark:border-dracula-600'>
        <span className='text-xs text-dracula-500 dark:text-dracula-400 font-semibold my-2 mx-2'>KONTO</span>       
        <button onClick={toggleTheme} id='theme-toggle' type='button' className='flex flex-row items-center py-1 hover:text-orange-500'>
          {isDarkTheme ? <><BsMoonStarsFill className='text-lg mx-2'/><span>Tryb nocny</span></> : <><BsSunFill className='text-xl mx-2'/><span>Tryb dzienny</span></>}
        </button>
        <Link className='flex flex-row items-center py-1 hover:text-orange-500'><MdOutlineAccountCircle className='text-xl mx-2'/><span>Konto</span></Link>
        <button className='flex flex-row items-center py-1 hover:text-orange-500'><AiOutlineLogout className='text-xl mx-2 '/><span>Wyloguj się</span></button>      
      </div>
       <div className='border-t-[1px] py-4 px-3 grid grid-cols-[max-content_max-content] items-center dark:border-dracula-600'>
        <div>
          <img src={hannahAvatar} width={30} className='rounded-3xl'/>
        </div>
        <div className='flex flex-col mx-2'>
          <h1 className='text-xs font-semibold whitespace-nowrap'>Hannah Montana</h1>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Admin</p>
        </div>
      </div>
      </div>

    </div>
    
    {isSideMenuExpanded &&
    <div className='grid grid-rows-[max-content_auto_max-content] max-h-screen px-4 py-2 border-l-[1px] w-max text-dracula-900 dark:text-dracula-100 dark:border-dracula-600 dark:bg-dracula-700'>
          
          {sideMenu === 'dictionary' ? 
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold'>Słownik</h1>
          </div>
          <DictionaryLinks setIsSideMenuExpanded={setIsSideMenuExpanded}/> 
          </>
          : sideMenu === "clientapp" ?
          <>
          <div className='flex py-3 px-2 border-b-[1px] dark:border-dracula-600'>
            <h1 className='text-base font-semibold'>Strona Klienta</h1>
          </div>
          <ClientAppLinks setIsSideMenuExpanded={setIsSideMenuExpanded}/>
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
