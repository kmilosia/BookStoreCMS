import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

function Searchbar(props) {
  //method for controlling changes in input value
  const handleSearchChange = (e) => {
    props.setSearchValue(e.target.value)
  }  
  //method to clear the input when the button is clicked
  const handleClearInput = () => {
    props.setSearchValue('')
  }
  return (
    <div className='relative mx-2'>
        {/* search input for the list of data */}
        <input value={props.searchValue} onChange={handleSearchChange} className='rounded-sm pl-3 pr-12 py-2 bg-dracula-100 outline-none text-dracula-600 placeholder:text-dracula-400 dark:placeholder:text-dracula-500 dark:bg-dracula-700 dark:text-dracula-100' placeholder="Szukaj..." type='text'/>
        {/* if the search value state is empty then render the search icon span otherwise render clear button with onclick method to clear the input */}
        {props.searchValue !== '' ? 
        <button onClick={handleClearInput} className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-dracula-400 dark:text-dracula-500 hover:text-dracula-600 dark:hover:text-dracula-200'><AiOutlineClose /></button>
        : 
        <span className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg text-dracula-400 dark:text-dracula-500'><HiOutlineSearch /></span>
        }
    </div>
  )
}

export default Searchbar
