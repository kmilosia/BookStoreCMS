import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { filterItems } from '../../utils/filter'
import { sortItems } from '../../utils/sort'
import { useMessageStore } from '../../store/messageStore'
import { claimValuesColumns } from '../../utils/column-names'
import Spinner from '../../components/Spinner'
import Searchbar from '../../components/Searchbar'
import SortBar from '../../components/SortBar'
import { claimValuesSortOptions } from '../../utils/select-options'
import axiosClient from '../../api/apiClient'

function ClaimValues() {
    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Admin/ClaimValues`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
        setIsDataLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }  
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Wartości uprawnienień</h1>    
        <div className='filter-panel'>
          <SortBar options={claimValuesSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
        </div>
        <div className='grid grid-cols-3 gap-1 items-center bg-dracula-150 text-dracula-500 px-6 py-4 my-0 rounded-md dark:bg-dracula-800 dark:text-dracula-400'>
        {claimValuesColumns.map(column => (
            <p key={column.name} className='font-semibold px-2'>{column.name}</p>
        ))}    
        </div>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-3'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.value}</p>                          
            </div>        
        ))}
      </div>
      }
        </div>
    </>
  )
}

export default ClaimValues
