import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { newsSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { newsColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import NewNews from '../modules/new/NewNews'
import EditNews from '../modules/edit/EditNews'
import ViewNews from '../modules/view/ViewNews'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'

function News() {
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
      const itemName = item.topic.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/News`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
          setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const postData = async (object) => {
      try{
        const rawToken = localStorage.getItem('token')
        if(rawToken){
          const token = rawToken.replace(/^"|"$/g, '')
          const response = await axiosClient.post('News', object ,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie dodano nową wiadomość", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania wiadomości", type: 'error'})
          }
        }else{
          setMessage({title: "Błąd przy pobieraniu tokena", type: 'error'})
        }
      }catch(err){
          setMessage({title: "Błąd podczas dodawania wiadomości", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/News/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie usunięto wiadomość", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania wiadomości", type: 'error'})
          }
      }catch(err){
          setMessage({title: "Błąd podczas usuwania wiadomości", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/News/${id}`, object)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie edytowano wiadomość", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania wiadomości", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas edytowania wiadomości", type: 'error'})
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
        <h1 className='main-header'>Wiadomość</h1>    
        <div className='filter-panel'>
          <SortBar options={newsSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Wiadomość"/>                   
        </div>
        <ListHeader columnNames={newsColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-3'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.topic}</p>
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
    {showNewModule && <NewNews postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditNews putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewNews editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default News
