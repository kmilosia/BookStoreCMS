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
        <div className='grid grid-cols-3 gap-3 my-2'>
            <OverviewElement color='purple' icon='fa-solid fa-truck-fast' amount={data.numberOfOrdersThisWeek} title="Zamówień"/>
            <OverviewElement color='red' icon='fa-solid fa-book' amount={data.numberOfRentalsThisWeek} title="Wypożyczeń"/>
            <OverviewElement color='blue' icon='fa-solid fa-calendar' amount={data.numberOfReservationsThisWeek} title="Rezerwacji"/>
        </div>
    </>
  )
}

export default WeeklyOverviewElement

const OverviewElement = ({amount, title, color, icon}) => {
    return(
        <div className={`flex w-full rounded-md h-max text-white shadow-md px-3 py-3 bg-${color}-400`}>
        <div className='flex w-full'>
          <div className={`w-auto h-full text-2xl aspect-square flex items-center justify-center rounded-md bg-${color}-300`}>
            <i className={icon}></i>
          </div>
          <div className='flex flex-col mx-3 w-full cursor-default'>
            <h1 className='text-2xl font-medium'>{amount}</h1>
            <h2 className='font-light overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs'>{title}</h2>
          </div>
        </div>
      </div>
    )
}
