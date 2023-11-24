import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { bookItemSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { bookItemColumns } from '../utils/column-names'
import EditBookItem from '../modules/edit/EditBookItem'
import ViewBookItem from '../modules/view/ViewBookItem'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import NewBookItem from '../modules/new/NewBookItem'

function BookItem() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
   
    const sortedItems = sortItems(data, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);

    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/BookItems`)
          setData(response.data)
          setIsDataLoading(false)
      }catch(err){
          console.error(err)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/BookItems`, object)
          getAllData()
      }catch(err){
        console.error(err)
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/BookItems/${id}`)
          console.log("Deleted object");
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/BookItems/${id}`, object)
          getAllData()
        } catch (err) {
          if (err.response) {
            // Request made and server responded with a status code
            console.error('Error Status:', err.response.status);
            console.error('Error Data:', err.response.data);
            console.error('Request Payload:', object);
          } else if (err.request) {
            // The request was made but no response was received
            console.error('Error Request:', err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error Message:', err.message);
          }
        }
      };  

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
        <h1 className='main-header'>Egzemplarz Książki</h1>    
        <div className='filter-panel'>
          <SortBar options={bookItemSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Egzemplarz"/>                   
        </div>
        <ListHeader  columnNames={bookItemColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map((item) => (             
            <div key={item.id} className='table-row-wrapper grid-cols-6'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.bookTitle}</p>
                <p className='px-2'>{item.formName}</p>
                <p className='px-2'>{item.isbn}</p>
                <p className='px-2'>{item.nettoPrice}</p>
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
    {showNewModule && <NewBookItem postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditBookItem putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewBookItem editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default BookItem
