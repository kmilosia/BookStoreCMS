import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoBlack from '../assets/logo-black-bold.png'
import logoWhite from '../assets/logo-white-bold.png'
import { BiUser, BiPackage, BiBook, BiBookBookmark} from 'react-icons/bi'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsFillSunFill, BsMoonStarsFill, BsSunFill} from 'react-icons/bs'
import {FiSettings, FiPlus, FiMinus} from 'react-icons/fi'
import hannahAvatar from '../assets/hannah.jpg'
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight,MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { checkTheme } from '../utils/theme'

function Sidebar() {
  const [isDarkTheme, setIsDarkTheme] = useState(checkTheme())
  const [isDictionaryExpanded, setIsDictionaryExpanded] = useState(false)
  const [isOrderExpanded, setIsOrderExpanded] = useState(false)
  const [isBookExpanded, setIsBookExpanded] = useState(false)
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

  const primaryLinkStyle = 'flex flex-row items-center hover:text-saphire-600 py-2 justify-between px-1'
  const secondaryLinkStyle = 'flex flex-row items-center py-2 hover:text-saphire-500'
  return (
    <div className='bg-gray-50 h-screen w-[300px] grid content-between text-gray-800 dark:text-gray-300 dark:bg-gray-800'>
      <div className='flex flex-row items-center justify-between border-b-[1px] dark:border-gray-700 px-2 py-3'>
        <div className='flex flex-row items-center'>
          {isDarkTheme ? 
          <Link to='/'><img alt='Logo' src={logoWhite} width={25} className='mx-1'/></Link> :
          <Link to='/'><img alt='Logo' src={logoBlack} width={25} className='mx-1'/></Link>
          }
          <span className='font-logo ml-1'>Owl's Cranny</span>
        </div>
        {/* <button className='mx-1'><MdOutlineKeyboardArrowLeft className='text-xl text-gray-700 dark:text-gray-400 dark:hover:text-gray-50 hover:text-gray-900'/></button>   */}
      </div>

      <div className='flex flex-col h-full px-3 py-4 overflow-y-scroll hidden-scroll'>
        <span className='text-xs text-gray-500 font-semibold my-1 mx-2'>OVERVIEW</span>
              
        <button onClick={()=> setIsDictionaryExpanded(!isDictionaryExpanded)} className={primaryLinkStyle}>
          <div className='flex flex-row items-center'>
            <BiBook className='text-xl mx-1'/>
            <span>Dictionary</span>
          </div>
          <FiPlus className='text-gray-400 dark:text-gray-600'/>
        </button>
        {isDictionaryExpanded &&  
        <div className='flex flex-col px-4 border-l-[1px] ml-[1.1rem] text-gray-400 dark:border-gray-600'>
          <Link to='/account-status' className={secondaryLinkStyle}>Account status</Link>
          <Link to='/admin-role' className={secondaryLinkStyle}>Admin role</Link>
          <Link to='/availability' className={secondaryLinkStyle}>Availability</Link>
          <Link to='/category' className={secondaryLinkStyle}>Category</Link>
          <Link to='/edition' className={secondaryLinkStyle}>Edition</Link>
          <Link to='/file-format' className={secondaryLinkStyle}>File format</Link>
          <Link to='/form' className={secondaryLinkStyle}>Form</Link>
          <Link to='/gender' className={secondaryLinkStyle}>Gender</Link>
          <Link to='/city' className={secondaryLinkStyle}>City</Link>
          <Link to='/country' className={secondaryLinkStyle}>Country</Link>
          <Link to='/order-status' className={secondaryLinkStyle}>Order status</Link>
          <Link to='/shipping-status' className={secondaryLinkStyle}>Shipping status</Link>
          <Link to='/transaction-status' className={secondaryLinkStyle}>Transaction status</Link>            
        </div> }  

        <button onClick={()=> setIsOrderExpanded(!isOrderExpanded)} className={primaryLinkStyle}>
          <div className='flex flex-row items-center'>
            <BiPackage className='text-xl mx-1'/>
            <span>Order</span>
          </div>
          <FiPlus className='text-gray-400 dark:text-gray-600'/>
        </button>
        {isOrderExpanded &&  
        <div className='flex flex-col px-4 border-l-[1px] ml-[1.1rem] text-gray-400 dark:border-gray-600'>
          <Link to='/account-status' className={secondaryLinkStyle}>Account status</Link>
          <Link to='/admin-role' className={secondaryLinkStyle}>Admin role</Link>
          <Link to='/availability' className={secondaryLinkStyle}>Availability</Link>
          <Link to='/category' className={secondaryLinkStyle}>Category</Link>
          <Link to='/edition' className={secondaryLinkStyle}>Edition</Link>
          <Link to='/file-format' className={secondaryLinkStyle}>File format</Link>
          <Link to='/form' className={secondaryLinkStyle}>Form</Link>
          <Link to='/gender' className={secondaryLinkStyle}>Gender</Link>
          <Link to='/order-status' className={secondaryLinkStyle}>Order status</Link>
          <Link to='/shipping-status' className={secondaryLinkStyle}>Shipping status</Link>
          <Link to='/transaction-status' className={secondaryLinkStyle}>Transaction status</Link>            
        </div> }

        <button onClick={()=> setIsBookExpanded(!isBookExpanded)} className={primaryLinkStyle}>
          <div className='flex flex-row items-center'>
            <BiBookBookmark className='text-xl mx-1'/>
            <span>Book</span>
          </div>
          <FiPlus className='text-gray-400 dark:text-gray-600'/>
        </button>
        {isBookExpanded &&  
        <div className='flex flex-col px-4 border-l-[1px] ml-[1.1rem] text-gray-400 dark:border-gray-600'>
          <Link to='/account-status' className={secondaryLinkStyle}>Account status</Link>
          <Link to='/admin-role' className={secondaryLinkStyle}>Admin role</Link>
          <Link to='/availability' className={secondaryLinkStyle}>Availability</Link>
          <Link to='/category' className={secondaryLinkStyle}>Category</Link>
          <Link to='/edition' className={secondaryLinkStyle}>Edition</Link>
          <Link to='/file-format' className={secondaryLinkStyle}>File format</Link>
          <Link to='/form' className={secondaryLinkStyle}>Form</Link>
          <Link to='/gender' className={secondaryLinkStyle}>Gender</Link>
          <Link to='/order-status' className={secondaryLinkStyle}>Order status</Link>
          <Link to='/shipping-status' className={secondaryLinkStyle}>Shipping status</Link>
          <Link to='/transaction-status' className={secondaryLinkStyle}>Transaction status</Link>            
        </div> }

        <button className='flex flex-row items-center hover:text-saphire-600 py-2 justify-between px-1'>
          <div className='flex flex-row items-center'>
            <BiUser className='text-xl mx-1'/>
            <span>User</span>
          </div>
          <FiPlus />
        </button>

        <button className='flex flex-row items-center hover:text-saphire-600 py-2 justify-between px-1'>
          <div className='flex flex-row items-center'>
            <BiUser className='text-xl mx-1'/>
            <span>User</span>
          </div>
          <FiPlus />
        </button>
        
      </div>

      <div>

      <div className='flex flex-col px-3 py-4 border-t-[1px] dark:border-gray-700'>
        <span className='text-xs text-gray-500 font-semibold my-1 mx-2'>ACCOUNT</span>       
        <button onClick={toggleTheme} id='theme-toggle' type='button' className='flex flex-row items-center py-2 hover:text-saphire-500'>
          {isDarkTheme ? <><BsMoonStarsFill className='text-lg mx-2'/><span>Dark mode</span></> : <><BsSunFill className='text-lg mx-2'/><span>Light mode</span></>}
        </button>
        <Link className='flex flex-row items-center py-2 hover:text-saphire-500'><FiSettings className='text-lg mx-2'/>Settings</Link>
        <button className='flex flex-row items-center py-2 hover:text-saphire-500'><AiOutlineLogout className='text-lg mx-2 '/>Log out</button>      
      </div>
      <div className='border-t-[1px] py-4 px-3 flex flex-row items-center dark:border-gray-700'>
        <div>
          <img src={hannahAvatar} width={30} className='rounded-3xl'/>
        </div>
        <div className='flex flex-col mx-2'>
          <h1 className='text-xs font-semibold'>Hannah Montana</h1>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Accountant</p>
        </div>
      </div>
      </div>

    </div>
  )
}

export default Sidebar
