import React from 'react'
import { FiPlus } from 'react-icons/fi'

function AddNewButton(props) {
  //onclick method for add button to open module window
  const handleAddClick = () => {
    props.setShowNewModule(true)
}
  return (
    <button onClick={handleAddClick} className='flex flex-row justify-between items-center rounded-md bg-orange-500 text-dracula-100 px-3 py-2 text-sm hover:bg-orange-600'>
        <div className='flex flex-row justify-between items-center'>
            <FiPlus className='text-xl mx-1 text-dracula-100 font-semibold'/>
            <h3 className='mx-2 text-base'>Dodaj {props.title}</h3>
        </div>              
    </button>
  )
}

export default AddNewButton
