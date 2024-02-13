import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BsTrash3Fill } from 'react-icons/bs'
import { filterItems } from '../../utils/filter'
import { sortItems } from '../../utils/sort'
import { useMessageStore } from '../../store/messageStore'
import ListHeader from '../../components/ListHeader'
import AddNewButton from '../../components/buttons/AddNewButton'
import Searchbar from '../../components/Searchbar'
import SortBar from '../../components/SortBar'
import Spinner from '../../components/Spinner'
import NewClaims from '../../modules/new/NewClaims'
import axiosClient from '../../api/apiClient'
import { claimsColumns } from '../../utils/column-names'
import { claimsSortOptions } from '../../utils/select-options'

function Claims() {
    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Admin/Claims`)
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
    const deleteData = async (name) => {
      try{
          const response = await axiosClient.delete(`/Admin/Claims?claimName=${name}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Uprawnienie zostało usunięte", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania uprawnienia", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas usuwania uprawnienia", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
          const response = await axiosClient.post(`/Admin/Claims`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Uprawnienie zostało dodane", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania uprawnienia", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas dodawania uprawnienia", type: 'error'})
      }
    }
    const handleDeleteClick = (itemID) => {
        deleteData(itemID)
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Widoki uprawnień</h1>    
        <div className='filter-panel'>
          <SortBar options={claimsSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="widoki uprawnień"/>                   
        </div>
        <ListHeader columnNames={claimsColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-3'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleDeleteClick(item.name)} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
    }
    </div>
    {showNewModule && <NewClaims postData={postData} setShowNewModule={setShowNewModule}/>}
    </>
  )
}

export default Claims
