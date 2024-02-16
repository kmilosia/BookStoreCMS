import React from 'react'
import { FaSortDown, FaSortUp } from 'react-icons/fa6'

function GrowthSpan({growth}) {
  return (
    growth > 0 ?
    <span className='text-green-500 flex flex-row items-end ml-2'><FaSortUp />{growth}%</span>
    : growth === 0 ?
    <span className=' text-gray-500 ml-2 '>{growth}%</span>
    :
    <span className='text-red-500 flex flex-row ml-2'><FaSortDown />{Math.abs(growth)}%</span>    
  )
}

export default GrowthSpan
