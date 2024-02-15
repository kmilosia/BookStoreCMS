import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import { sortItems } from '../utils/sort'
import { orderSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { orderColumns } from '../utils/column-names'
import { AiFillEye } from 'react-icons/ai'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import {formatDisplayDate} from '../utils/functions/formatDisplayDate'
import ViewOrder from '../modules/view/ViewOrder'
import { getValidToken } from '../api/getValidToken'
import { useAuthStore } from '../store/authStore'

function Order() {
    const decodedToken = useAuthStore((state) => state.decodedToken)
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const filterItems = (list, value) => list.filter((item) => {
        if (!value) {
            return true;
        }
        const itemName = item.customerDetails.surname.toLowerCase()
        return itemName.includes(value.toLowerCase())
      })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getItem = async (id,setData) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/Order/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
        setData(response.data)
        }}
      }catch(err){
        console.log(err)
      }
    }
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.get(`/Order`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }}
          setIsDataLoading(false)
      }catch(err){
        setIsDataLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const handleViewClick = (itemID) => {
      setEditedID(itemID)
      setShowViewModule(true)
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Zamówienie</h1>    
        <div className='filter-panel'>
          <SortBar options={orderSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
        </div>
        <ListHeader columnNames={orderColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.customerDetails.name} {item.customerDetails.surname}</p>                       
                <p className='px-2'>{item.orderDate && formatDisplayDate(item.orderDate)}</p>
                <p className='px-2'>{item.totalBruttoPrice}zł</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                </div>             
            </div>        
        ))}
      </div>
    }
    </div>
    {showViewModule && <ViewOrder getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Order
