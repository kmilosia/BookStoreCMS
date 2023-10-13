import React from 'react'

function ListHeader(props) {
    const cols = props.columnNames.length + 1
    const gridCols = `grid-cols-${cols}`
  return (
    <div className={`list-header ${gridCols}`}>
        {props.columnNames.map(column => (
            <p key={column.name} className='list-header-p'>{column.name}</p>
        ))}    
    </div>
  )
}

export default ListHeader
