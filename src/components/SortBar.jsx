import React from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import Select from 'react-select'

function SortBar(props) {
   const handleSelectChange = (selectedOption) => {
    props.setSelectedOption(selectedOption)
  }
  return (
    <div className='flex flex-row items-center'>
       {props.selectedOption !== null &&
        <BiSortAlt2 onClick={() => props.setIsAscending(!props.isAscending)} className='text-3xl cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200'/>}
        <Select onChange={handleSelectChange} value={props.selectedOption} options={props.options} isClearable={true} className="my-react-select-container w-[250px]" classNamePrefix="my-react-select" placeholder='Sortuj według..'/>
    </div> 
  )
}

export default SortBar
