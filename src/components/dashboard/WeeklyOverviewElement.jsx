import React, { useEffect, useState } from 'react'
import { getWeeklySummary } from '../../api/cmsAPI'

function WeeklyOverviewElement() {
    const [data, setData] = useState({})
    useEffect(() => {
        getWeeklySummary(setData)
    },[])
  return (
    Object.keys(data).length > 0 &&
    <>
        <h3 className='home-element-header'>Podsumowanie tygodnia</h3>
        <div className='grid grid-cols-2 gap-3 my-2'>
          <div className={`flex w-full rounded-md h-max text-white shadow-md px-3 py-3 bg-[#02B2AF]`}>
          <div className='flex w-full'>
            <div className={`w-auto h-full text-2xl aspect-square flex items-center justify-center rounded-md bg-white/30`}>
              <i className='fa-solid fa-book'></i>
            </div>
            <div className='flex flex-col mx-3 w-full cursor-default'>
              <h1 className='text-2xl font-medium'>{data.numberOfRentalsThisWeek}</h1>
              <h2 className='font-light overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs'>Wypożyczeń</h2>
            </div>
          </div>
        </div>
        <div className={`flex w-full rounded-md h-max text-white shadow-md px-3 py-3 bg-[#B800D8]`}>
        <div className='flex w-full'>
          <div className={`w-auto h-full text-2xl aspect-square flex items-center justify-center rounded-md bg-white/30`}>
            <i className='fa-solid fa-truck-fast'></i>
          </div>
          <div className='flex flex-col mx-3 w-full cursor-default'>
            <h1 className='text-2xl font-medium'>{data.numberOfOrdersThisWeek}</h1>
            <h2 className='font-light overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs'>Zamówień</h2>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default WeeklyOverviewElement
