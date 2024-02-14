import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { discountSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { discountColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import NewDiscount from '../modules/new/NewDiscount'
import ViewDiscount from '../modules/view/ViewDiscount'
import EditDiscount from '../modules/edit/EditDiscount'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'

function Discount() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const filterItems = (list, value) => list.filter((item) => {
      if (!value) {
          return true;
      }
      const itemName = item.title.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getItem = async (id,setDiscount) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/Discount/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
          setDiscount(response.data)
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
          const response = await axiosClient.get(`/Discount`,{
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
          setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const postData = async (object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/Discount`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie dodano nową promocję", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania promocji", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd podczas dodawania promocji", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/Discount/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie usunięto promocję", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania promocji", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd podczas usuwania promocji", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/Discount/${id}`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie edytowano promocję", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania promocji", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas edytowania promocji", type: 'error'})
      }
    }
    const handleEditClick = (itemID) => {
       setEditedID(itemID)
       setShowEditModule(true)
    }
    const handleDeleteClick = (itemID) => {
      deleteData(itemID)
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
        <h1 className='main-header'>Promocja</h1>    
        <div className='filter-panel'>
          <SortBar options={discountSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Promocję"/>                   
        </div>
        <ListHeader columnNames={discountColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.title}</p>
                <p className='px-2'>{item.percentOfDiscount}%</p>
                <p className='px-2'>{item.isAvailable ? "Aktywna" : "Zakończona"}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
      }
        </div>
    {showNewModule && <NewDiscount postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditDiscount putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewDiscount getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Discount
