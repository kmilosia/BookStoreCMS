import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { bannerSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { bannerColumns } from '../utils/column-names'
import NewBanner from '../modules/new/NewBanner'
import EditBanner from '../modules/edit/EditBanner'
import ViewBanner from '../modules/view/ViewBanner'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'
import { useAuthStore } from '../store/authStore'

function Banner() {
    const decodedToken = useAuthStore((state) => state.decodedToken)
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const filterItems = (list, value) => list.filter((item) => {
      if (!value) {
          return true;
      }
      const itemName = item.title.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const getItem = async (id,setData) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/Banner/${id}`,{
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
          const response = await axiosClient.get(`/Banner`,{
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
          const response = await axiosClient.post(`/Banner`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie dodano nowy baner", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania nowego baneru", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd podczas dodawania nowego baneru", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/Banner/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie usunięto baner", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania baneru", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd podczas usuwania baneru", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/Banner/${id}`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie edytowano baner", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania baneru", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas edytowania baneru", type: 'error'})
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
        <h1 className='main-header'>Baner</h1>    
        <div className='filter-panel'>
          <SortBar options={bannerSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>    
          {(decodedToken?.Banner?.includes('w') || decodedToken?.role === 'Admin') &&                                               
          <AddNewButton setShowNewModule={setShowNewModule} title="Baner"/>}                 
        </div>
        <ListHeader columnNames={bannerColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-3'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.title}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  {(decodedToken?.Banner?.includes('e') || decodedToken?.role === 'Admin') &&                                          
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>}
                  {(decodedToken?.Banner?.includes('d') || decodedToken?.role === 'Admin') &&                                          
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>}
                </div>             
            </div>        
        ))}
      </div>
      }
        </div>
    {showNewModule && <NewBanner postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditBanner getItem={getItem} putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewBanner getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Banner
