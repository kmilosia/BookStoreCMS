import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

function Searchbar(props) {
  //onchange method for searchbar
  const handleSearchChange = (e) => {
    props.setSearchValue(e.target.value)
  }  
  return (
    <div className='relative mx-4'>
        <input onChange={handleSearchChange} className='rounded-md pl-3 pr-12 py-2 dark:bg-gray-700 dark:text-gray-100' placeholder={`Search ${props.title}...`} type='text'/>
        <span className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-gray-400 hover:text-gray-500'><HiOutlineSearch /></span>
    </div>
  )
}

export default Searchbar
