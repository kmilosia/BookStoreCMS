import React from 'react'
import { GiCalendar } from 'react-icons/gi'

function ReservationOverviewElement() {
  return (
    <div className='flex w-full rounded-md text-white shadow-md px-3 py-3 bg-sky-400'>
          <div className='flex w-full'>
          <div className='w-auto h-full text-3xl aspect-square flex items-center justify-center rounded-md bg-sky-300'>
            <GiCalendar />
          </div>
          <div className='flex flex-col mx-3 w-full cursor-default'>
            <h1 className='text-2xl'>20</h1>
            <h2 className='font-light'>Rezerwacji</h2>
          </div>
          </div>
    </div>
  )
}

export default ReservationOverviewElement
