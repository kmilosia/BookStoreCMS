import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import hannahAvatar from '../assets/hannah.jpg'
import {BsThreeDotsVertical,BsFillSunFill,BsMoonStarsFill} from 'react-icons/bs'
import {BiSolidDashboard,BiUserCircle,BiLogOut} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Navbar() {
    const [darkTheme, setDarkTheme] = useState(false)
    const [userDropdown, setUserDropdown] = useState(false)
    const [userButtonWidth,setUserButtonWidth] = useState(0)
    const [userButtonHeight,setUserButtonHeight] = useState(0)
    const ref = useRef(null)   
    useLayoutEffect(() => {
        setUserButtonWidth(ref.current.offsetWidth)
        setUserButtonHeight(ref.current.offsetHeight)
    },[])
    const dropdownStyle = {
        width: `${userButtonWidth}px`,
        top: `${userButtonHeight + 10}px`
      };
    const iconStyle = 'mx-2 text-lg text-gray-700'
    const linkStyle = 'flex flex-row items-center p-2 my-1 rounded-md transition-all hover:bg-saphire-200'
  return (
    <div className='flex items-center justify-end p-6 bg-slate-200'>
        <button className='py-3 px-3 mx-3'>       
        {darkTheme ? <BsMoonStarsFill onClick={() => setDarkTheme(!darkTheme)} className='text-2xl text-saphire-300 transition-all hover:text-saphire-500'/> : <BsFillSunFill className='text-2xl text-amber-300 transition-all hover:text-amber-400' onClick={() => setDarkTheme(!darkTheme)}/>}
        </button>          
        <div onClick={() => setUserDropdown(!userDropdown)} ref={ref} className='relative inline-block cursor-pointer bg-gray-50 mr-6 rounded-lg py-2 px-3 transition-all hover:bg-gray-100'>
            <div className='flex flex-row items-center'>
              <BsThreeDotsVertical className='text-gray-700'/>
              <h3 className='mx-3 text-gray-600 cursor-pointer'>Hannah Montana</h3>
              <img src={hannahAvatar} width={30} alt='Logo' className='rounded-3xl'/>
            </div>
            
            {userDropdown && 
            <div style={dropdownStyle} className='absolute z-[1] bg-slate-50 p-4 right-0 rounded-lg'>
              <ul className='flex flex-col'>
                <Link className={linkStyle}><BiSolidDashboard className={iconStyle}/>Home</Link>
                <Link className={linkStyle}><BiUserCircle className={iconStyle}/>Profile</Link>
                <Link className={linkStyle}><FiSettings className={iconStyle}/>Settings</Link>
                <div className='border-t border-gray-300'></div>
                <button className={linkStyle}><BiLogOut className={iconStyle} />Sign Out</button>
              </ul>
            </div>} 

        </div>                 
    </div>
  )
}

export default Navbar
