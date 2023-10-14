import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/AddNewButton'
import { fetchAll } from '../api/fetchAPI'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { authorSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { authorColumnNames } from '../utils/column-names'
import NewAuthor from '../modules/NewAuthor'
import EditAuthor from '../modules/EditAuthor'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import ViewAuthor from '../modules/ViewAuthor'
import axiosClient from '../api/apiClient'

function Author() {
    const table = 'Author'
    const [authors, setAuthors] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
   
    const sortedItems = sortItems(authors, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);

    const getAllData = async () => {
      try{
          const response = await axiosClient.get(`/Author`)
          setAuthors(response.data)
      }catch(err){
          console.error(err)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/Author`, object)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Author/${id}`)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/Author/${id}`, object)
          getAllData()
      }catch(err){
        console.error(err)
      }
  }

    const handleEditClick = (itemID) => {
       setEditedID(itemID)
       setShowEditModule(true)
    }
    const handleDeleteClick = () => {
   
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
        <h1 className='main-header'>Autorzy</h1>    
        <div className='filter-panel'>
            <SortBar options={authorSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>                     
            <div className='flex-x'>
            <Searchbar setSearchValue={setSearchValue} title="Szukaj autora..." />
            <AddNewButton setShowNewModule={setShowNewModule} title="Dodaj Autora" /> 
            </div>  
        </div>
        <ListHeader columnNames={authorColumnNames} />      
        {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.name}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick()} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
    </div>
    {showNewModule && <NewAuthor postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditAuthor putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewAuthor editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Author
