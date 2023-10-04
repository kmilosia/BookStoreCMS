import React from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import Select from 'react-select'

function SortBar(props) {
   //onchange method for sort select
   const handleSelectChange = (selectedOption) => {
    props.setSelectedOption(selectedOption)
  }
  return (
    <div className='flex flex-row items-center mx-1'>
        <p className='text-lg text-gray-600 dark:text-gray-300'>Sort by:</p>
        <Select onChange={handleSelectChange} value={props.selectedOption} options={props.options} isClearable={true} className="my-react-select-container mx-3 w-[200px]" classNamePrefix="my-react-select" placeholder='Choose an option..'/>
        {props.selectedOption !== null &&
        <BiSortAlt2 onClick={() => props.setIsAscending(!props.isAscending)} className='text-3xl cursor-pointer text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100'/>}
    </div> 
  )
}

export default SortBar
