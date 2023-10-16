import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

function Searchbar(props) {
  //onchange method for searchbar
  const handleSearchChange = (e) => {
    props.setSearchValue(e.target.value)
  }  
  
  return (
    <div className='relative mx-4'>
        <input onChange={handleSearchChange} className='rounded-md pl-3 pr-12 py-2 bg-dracula-100 outline-none text-dracula-600 placeholder:text-dracula-400 dark:placeholder:text-dracula-500 dark:bg-dracula-700 dark:text-dracula-100' placeholder="Szukaj..." type='text'/>
        <span className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-dracula-400 hover:text-dracula-500 dark:text-dracula-500 dark:hover:text-dracula-400'><HiOutlineSearch /></span>
    </div>
  )
}

export default Searchbar
