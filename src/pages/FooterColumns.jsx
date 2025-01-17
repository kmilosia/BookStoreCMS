import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { footerColumnsSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { footerColumns } from '../utils/column-names'
import NewFooterColumn from '../modules/new/NewFooterColumn'
import EditFooterColumn from '../modules/edit/EditFooterColumn'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import ViewFooterColumn from '../modules/view/ViewFooterColumn'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'
import { useAuthStore } from '../store/authStore'

function FooterColumns() {
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
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getItem = async (id,setColumn) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/FooterColumns/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
        setColumn(response.data)
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
          const response = await axiosClient.get(`/FooterColumns`,{
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
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/FooterColumns/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Kolumna footera została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania kolumny", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas usuwania kolumny", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/FooterColumns`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Kolumna footera została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania kolumny", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas dodawania kolumny", type: 'error'})
      }
    }
    const putData = async (id,data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/FooterColumns/${id}`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Kolumna footera została edytowana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania kolumny", type: 'error'})
          }}
      }catch(e){
        setMessage({title: "Błąd podczas edytowania kolumny", type: 'error'})
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
        <h1 className='main-header'>Kolumna Footera</h1>    
        <div className='filter-panel'>
          <SortBar options={footerColumnsSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>   
          {(decodedToken?.FooterColumns?.includes('w') || decodedToken?.role === 'Admin') &&                                         
          <AddNewButton setShowNewModule={setShowNewModule} title="Footer Kolumnę"/>}                  
        </div>
        <ListHeader  columnNames={footerColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.position}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  {(decodedToken?.FooterColumns?.includes('e') || decodedToken?.role === 'Admin') &&                                   
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>}
                  {(decodedToken?.FooterColumns?.includes('d') || decodedToken?.role === 'Admin') &&                                   
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>}
                </div>             
            </div>        
        ))}
      </div>
      }
      </div>
    {showNewModule && <NewFooterColumn postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditFooterColumn putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewFooterColumn getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default FooterColumns
