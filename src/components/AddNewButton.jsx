import React from 'react'
import { FiPlus } from 'react-icons/fi'

function AddNewButton(props) {
  //onclick method for add button to open module window
  const handleAddClick = () => {
    props.setShowNewModule(true)
}
  return (
    <button onClick={handleAddClick} className=' bg-orange-400 py-2 px-4 cursor-pointer rounded-sm hover:bg-orange-500'>
          <span className='text-dracula-100 text-sm font-[500]'>Dodaj {props.title}</span>
    </button> 
  )
}

export default AddNewButton
