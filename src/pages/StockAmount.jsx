import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import { sortItems } from '../utils/sort'
import { stockSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import { stockItemsColumns } from '../utils/column-names'

function StockAmount() {
    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const filterItems = (list, value) => list.filter((item) => {
      if (!value) {
          return true;
      }
      const itemName = item.bookTitle.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/StockAmount`)
          if(response.status === 200 || response.status === 204){
            setData(response.data.value)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
        setIsDataLoading(false)
      }
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Stan Magazynu</h1>    
        <div className='filter-panel'>
          <SortBar options={stockSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
        </div>
        <div className={`grid grid-cols-4 gap-1 items-center bg-dracula-150 text-dracula-500 px-6 py-4 my-0 rounded-md dark:bg-dracula-800 dark:text-dracula-400 `}>
        {stockItemsColumns.map(column => (
            <p key={column.name} className='font-semibold px-2'>{column.name}</p>
        ))}    
        </div>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.bookItemID}</p>
                <p className='px-2'>{item.bookTitle}</p>
                <p className='px-2'>{item.amount}</p>           
            </div>        
        ))}
      </div>
      }
      </div>
    </>
  )
}

export default StockAmount
