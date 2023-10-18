import React from 'react'

function ListHeader(props) {
    const cols = props.columnNames.length + 1
    const gridCols = `grid-cols-${cols}`
  return (
    <div className={`grid grid-cols-3 items-center bg-gray-100 text-dracula-700 px-6 py-4 my-[2px] rounded-sm dark:bg-dracula-800 dark:text-dracula-300 ${gridCols}`}>
        {props.columnNames.map(column => (
            <p key={column.name} className='font-semibold px-2'>{column.name}</p>
        ))}    
    </div>
  )
}

export default ListHeader
