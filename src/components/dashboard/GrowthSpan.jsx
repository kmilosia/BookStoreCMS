import React from 'react'
import { FaSortDown, FaSortUp } from 'react-icons/fa6'

function GrowthSpan({growth}) {
  return (
    growth > 0 ?
    <span className='growth-span bg-green-500 items-end'><FaSortUp />{growth}%</span>
    : growth === 0 ?
    <span className=' bg-gray-400 growth-span '>{growth}%</span>
    :
    <span className='growth-span bg-red-500'><FaSortDown />{Math.abs(growth)}%</span>    
  )
}

export default GrowthSpan
