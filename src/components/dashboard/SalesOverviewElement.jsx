import React from 'react'
import { GiCardboardBoxClosed } from 'react-icons/gi'

function SalesOverviewElement() {
  return (
    <div className='flex w-full rounded-md h-max text-white shadow-md px-3 py-3 bg-purple-400'>
    <div className='flex w-full'>
      <div className='w-auto h-full text-3xl aspect-square flex items-center justify-center rounded-md bg-purple-300'>
        <GiCardboardBoxClosed />
      </div>
      <div className='flex flex-col mx-3 w-full cursor-default'>
        <h1 className='text-2xl font-medium'>10</h1>
        <h2 className='font-light overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs'>
          Sprzedanych książek
        </h2>
      </div>
    </div>
  </div>
  )
}

export default SalesOverviewElement
