import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import { sortItems } from '../utils/sort'
import { reviewSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { reviewColumns } from '../utils/column-names'
import ViewBookItemReview from '../modules/view/ViewBookItemReview'
import { AiFillEye } from 'react-icons/ai'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'

function BookItemReview() {
    const [data, setData] = useState([])
    const [editedItem, setEditedItem] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const filterItems = (list, value) => list.filter((item) => {
      if (!value) {
          return true;
      }
      const itemName = item.customerName.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const getItem = async (id,setData) => {
      try{
        const response = await axiosClient.get(`/BookItemReview?bookItemId=${id}`)
        if(response.status === 200 || response.status === 204){
          setData(response.data)
        }
      }catch(err){
        console.log(err)
      }
    }
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/BookItems`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
          console.log(err)
          setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const handleViewClick = (itemID) => {
      setEditedItem(itemID)
      setShowViewModule(true)
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Recenzje produktu</h1>    
        <div className='filter-panel'>
          <SortBar options={reviewSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
        </div>
        <ListHeader columnNames={reviewColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.bookTitle}</p>
                <p className='px-2'>{item.formName === 'Book' ? 'Książka' : 'Ebook'}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item)} className='table-button'><AiFillEye /></button>
                </div>             
            </div>        
        ))}
      </div>
      }
        </div>
    {showViewModule && <ViewBookItemReview getItem={getItem} editedItem={editedItem} setShowViewModule={setShowViewModule} setEditedItem={setEditedItem}/>}
    </>
  )
}

export default BookItemReview
