import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { supplySortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { supplyColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { formatDisplayDate } from '../utils/functions/formatDisplayDate'
import ViewSupply from '../modules/view/ViewSupply'
import NewSupply from '../modules/new/NewSupply'
import { useMessageStore } from '../store/messageStore'
import EditSupply from '../modules/edit/EditSupply'
import { getValidToken } from '../api/getValidToken'

function Supply() {
    const setMessage = useMessageStore((state) => state.setMessage)
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
      const itemName = item.supplierName.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const getItem = async (id,setData) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/Supply/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
          setData(response.data)
        }}
      }catch(e){
        console.log(e)
      }
    }
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.get(`/Supply`,{
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
    const postData = async (object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/Supply`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Nowa dostawa została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd przy dodawaniu nowej dostawy", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd przy dodawaniu nowej dostawy", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/Supply/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Dostawa została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas usuwania", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/Supply/${id}`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            getAllData()
            setMessage({title: "Dostawa została edytowana", type: 'success'})
          }else{
            setMessage({title: "Błąd podczas edycji danych", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas edycji danych", type: 'error'})
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
        <h1 className='main-header'>Dostawa na magazyn</h1>    
        <div className='filter-panel'>
          <SortBar options={supplySortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Nową Dostawę"/>                   
        </div>
        <ListHeader columnNames={supplyColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.supplierName}</p>
                <p className='px-2'>{item.supplyDate && formatDisplayDate(item.supplyDate)}</p>
                <p className='px-2'>{item.priceBrutto}</p>
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
    {showNewModule && <NewSupply postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditSupply putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewSupply getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Supply
