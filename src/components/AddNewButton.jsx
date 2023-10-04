import React from 'react'
import { FiPlus } from 'react-icons/fi'

function AddNewButton(props) {
  //onclick method for add button to open module window
  const handleAddClick = () => {
    props.setShowNewModule(true)
}
  return (
    <button onClick={handleAddClick} className='flex flex-row justify-between  items-center rounded-lg bg-saphire-500 text-white px-3 py-2 text-sm hover:bg-saphire-600'>
        <div className='flex flex-row justify-between items-center'>
            <FiPlus className='text-lg mx-1 text-gray-100 font-semibold'/>
            <h3 className='mx-2 text-base'>Add {props.title}</h3>
        </div>              
    </button>
  )
}

export default AddNewButton
