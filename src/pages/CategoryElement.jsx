import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { categoryElementSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { categoryElementColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import NewCategoryElement from '../modules/new/NewCategoryElement'
import EditCategoryElement from '../modules/edit/EditCategoryElement'
import ViewCategoryElement from '../modules/view/ViewCategoryElement'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'
import { useAuthStore } from '../store/authStore'

function CategoryElement() {
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
      const itemName = item.categoryName.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const getItem = async (id,setElement) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/CategoryElements/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
        setElement(response.data)
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
          const response = await axiosClient.get(`/CategoryElements`,{
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
        setIsDataLoading(false)
      }
    }
    const postData = async (object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/CategoryElements`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Element kategorii został dodany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania elementu", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas dodawania elementu", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/CategoryElements/${id}?categoryElementId=${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Element kategorii został usunięty", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania elementu", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas usuwania elementu", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/CategoryElements/${id}`, object,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Element kategorii został edytowany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania elementu", type: 'error'})
          }}
        } catch (err) {
          setMessage({title: "Błąd podczas edytowania elementu", type: 'error'})
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
        <h1 className='main-header'>Element Kategorii</h1>    
        <div className='filter-panel'>
          <SortBar options={categoryElementSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>    
          {(decodedToken?.CategoryElement?.includes('w') || decodedToken?.role === 'Admin') &&                                               
          <AddNewButton setShowNewModule={setShowNewModule} title="Element Kategorii"/>}                  
        </div>
        <ListHeader  columnNames={categoryElementColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.categoryName}</p>                       
                <p className='px-2'>{item.path}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  {(decodedToken?.CategoryElement?.includes('e') || decodedToken?.role === 'Admin') &&                                          
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>}
                  {(decodedToken?.CategoryElement?.includes('d') || decodedToken?.role === 'Admin') &&                                          
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>}
                </div>             
            </div>        
        ))}
      </div>
      }
        </div>
    {showNewModule && <NewCategoryElement postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditCategoryElement putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewCategoryElement getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default CategoryElement
