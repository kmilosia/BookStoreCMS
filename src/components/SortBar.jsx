import React from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import Select from 'react-select'

function SortBar(props) {
   //a method to control an input value of select - one value
   const handleSelectChange = (selectedOption) => {
    props.setSelectedOption(selectedOption)
  }
  return (
    <div className='flex flex-row items-center'>
       {/* if any value to sort is selected, only then render a button which reverse the sorting order */}
       {props.selectedOption !== null &&
        <BiSortAlt2 onClick={() => props.setIsAscending(!props.isAscending)} className='text-3xl cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200'/>}
        {/* select receive from the parent component options list and update a value of the parent's state which is selected option */}
        <Select onChange={handleSelectChange} value={props.selectedOption} options={props.options} isClearable={true} className="my-react-select-container w-[250px]" classNamePrefix="my-react-select" placeholder='Sortuj według..'/>
           </div> 
  )
}

export default SortBar
