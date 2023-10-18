import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/AddNewButton'
import { fetchAll } from '../api/fetchAPI'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { bookSortOptions, dictionarySortOptions, personSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { bookColumns, dictionaryColumns, personColumns } from '../utils/column-names'
import NewBook from '../modules/new/NewBook'
import EditBook from '../modules/edit/EditBook'
import ViewBook from '../modules/view/ViewBook'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'

function Book() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
   
    const sortedItems = sortItems(data, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);

    const getAllData = async () => {
      try{
          const response = await axiosClient.get(`/Book`)
          setData(response.data)
          console.log("Book gotten");
      }catch(err){
          console.error(err)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/Book`, object)
          console.log(response.data);
          console.log("Posted book!");
          getAllData()
      }catch(err){
        if (err.response) {
          // Request made and server responded with a status code that falls out of the range of 2xx
          console.error("Error Response Data:", err.response.data);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("No Response Received:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', err.message);
        }      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Book/${id}`)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/Book/${id}`, object)
          getAllData()
      }catch(err){
        console.error(err)
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
        <div className='h-full grid grid-rows-[max-content_auto] px-6 py-6 bg-slate-200 dark:bg-dracula-900'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Książka</h1>    
        <div className='flex flex-row justify-end my-4'>
          <SortBar options={bookSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Książkę"/>                   
        </div>
        <ListHeader  columnNames={bookColumns}/>
      </div>
      <div className='w-full overflow-auto scrollbar-default'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.title}</p>
                <p className='px-2'>{item.publisherName}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
        </div>
    {showNewModule && <NewBook postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditBook putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewBook editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Book
