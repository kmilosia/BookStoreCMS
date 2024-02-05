import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { newsletterSortOptions } from '../utils/select-options'
import { formatDisplayDate } from '../utils/functions/formatDisplayDate'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { newsletterColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import ButtonSpinner from '../components/ButtonSpinner'
import NewNewsletter from '../modules/new/NewNewsletter'
import EditNewsletter from '../modules/edit/EditNewsletter'
import ViewNewsletter from '../modules/view/ViewNewsletter'
import { useMessageStore } from '../store/messageStore'

function Newsletter() {
    const [data, setData] = useState([])
    const [editedItem, setEditedItem] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [sendingLoading, setSendingLoading] = useState(false)
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
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Newsletter`)
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
          const response = await axiosClient.post(`/Newsletter`, object)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie dodano nowego newslettera", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania nowego newslettera", type: 'error'})
          }
      }catch(err){
          setMessage({title: "Błąd podczas dodawania nowego newslettera", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/Newsletter/${id}`, object)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pomyślnie edytowano newslettera", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania newslettera", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas edytowania newslettera", type: 'error'})
      }
    }
    const sendData = async () => {
      try{
          setSendingLoading(true)
          const response = await axiosClient.get(`/Newsletter/SEND`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Newsletter został wysłany", type: 'success'})
          }else{
            setMessage({title: "Błąd podczas wysyłania newslettera", type: 'error'})
          }
          setSendingLoading(false)
      }catch(err){
        setSendingLoading(false)
        setMessage({title: "Błąd podczas wysyłania newslettera", type: 'error'})
      }
    }
    const handleEditClick = (item) => {
       setEditedItem(item)
       setShowEditModule(true)
    }
    const handleViewClick = (item) => {
      setEditedItem(item)
      setShowViewModule(true)
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Newsletter</h1>    
        <div className='filter-panel'>
          <button onClick={() => sendData()} className='group w-64 border-2 border-purple-400 bg-transparent py-2 cursor-pointer rounded-md hover:bg-purple-400 mr-2 flex items-center justify-center'>
            {sendingLoading ? <ButtonSpinner /> :
            <span className='text-purple-400 text-sm font-medium group-hover:text-white'>Wyślij ostatniego Newslettera</span>}
          </button> 
          <SortBar options={newsletterSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Newsletter"/>                   
        </div>
        <ListHeader  columnNames={newsletterColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.title}</p>
                <p className='px-2'>{formatDisplayDate(item.publicationDate)}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item)} className='table-button'><AiFillEdit /></button>
                </div>             
            </div>        
        ))}
      </div>
      }
      </div>
    {showNewModule && <NewNewsletter postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditNewsletter putData={putData} editedItem={editedItem} setEditedItem={setEditedItem} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewNewsletter editedItem={editedItem} setShowViewModule={setShowViewModule} setEditedItem={setEditedItem}/>}
    </>
  )
}

export default Newsletter
