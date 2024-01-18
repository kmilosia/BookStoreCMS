import React from 'react'

function AddNewButton(props) {
  return (
    <button onClick={props.setShowNewModule} className='w-max bg-purple-400 py-2 px-4 cursor-pointer rounded-md hover:bg-purple-500'>
          <span className='text-dracula-100 text-sm font-medium'>Dodaj {props.title}</span>
    </button> 
  )
}

export default AddNewButton
