import React from 'react'
import { GiBookCover } from 'react-icons/gi'

function RentalOverviewElement() {
  return (
    <div className='flex w-full rounded-md text-white shadow-md px-3 py-3 bg-orange-400'>
          <div className='flex w-full'>
          <div className='w-auto h-full text-3xl aspect-square flex items-center justify-center rounded-md bg-orange-300'>
            <GiBookCover  />
          </div>
          <div className='flex flex-col mx-3 w-full cursor-default'>
            <h1 className='text-2xl'>14</h1>
            <h2 className='font-light'>Wypożyczeń</h2>
          </div>
          </div>
    </div>
  )
}

export default RentalOverviewElement
