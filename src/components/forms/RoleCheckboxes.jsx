import React, { useEffect, useState } from 'react'

function RoleCheckboxes({name,claimPosts, handleCheck}) {
    const [element, setElement] = useState({})
    useEffect(() => {
        const element = claimPosts.find((item) => item.claimName === name)
        setElement(element)
    },[claimPosts])
  return (
    <div className='grid grid-cols-5 gap-1 items-center bg-white px-6 py-4 rounded-md border-t-2 border-dracula-200 dark:border-dracula-900 dark:bg-dracula-700 dark:text-gray-100'>
        <p>{name}</p>
        <input type='checkbox' checked={element?.claimValues?.includes('r')} onChange={() => handleCheck(name, 'r')} />
        <input type='checkbox' checked={element?.claimValues?.includes('w')} onChange={() => handleCheck(name, 'w')}/>
        <input type='checkbox' checked={element?.claimValues?.includes('e')} onChange={() => handleCheck(name, 'e')}/>
        <input type='checkbox' checked={element?.claimValues?.includes('d')} onChange={() => handleCheck(name, 'd')}/>
    </div>
  )
}

export default RoleCheckboxes
