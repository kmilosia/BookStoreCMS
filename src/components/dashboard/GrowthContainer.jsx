import React from 'react'
import GrowthSpan from './GrowthSpan'

function GrowthContainer({title, value, growth}) {
  return (
    <div className='rounded-md flex flex-col w-full bg-white dark:text-white dark:bg-dracula-700 px-5 py-5 shadow-md cursor-default'>
    <h4 className='text-sm font-medium dark:font-normal'>{title}</h4>
    <div className='flex items-end mt-auto'>
        <p className='text-xl font-medium mt-2'>{value}PLN</p>
        <GrowthSpan growth={growth} />
    </div>
    </div>
  )
}

export default GrowthContainer
