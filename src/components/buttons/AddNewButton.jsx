import React from 'react'

function AddNewButton(props) {
  const handleAddClick = () => {
    props.setShowNewModule(true)
}
  return (
    <button onClick={handleAddClick} className=' bg-purple-400 py-2 px-4 cursor-pointer rounded-sm hover:bg-purple-500'>
          <span className='text-dracula-100 text-sm font-medium'>Dodaj {props.title}</span>
    </button> 
  )
}

export default AddNewButton
