import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { personSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { personColumns } from '../utils/column-names'
import NewAuthor from '../modules/new/NewAuthor'
import EditAuthor from '../modules/edit/EditAuthor'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import ViewAuthor from '../modules/view/ViewAuthor'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'

function Author() {
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
          const response = await axiosClient.get(`/Author`)
          setData(response.data)
          setIsDataLoading(false)

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
        <h1 className='main-header'>Autor</h1>    
        <div className='filter-panel'>
          <SortBar options={personSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Autora"/>                   
        </div>
        <ListHeader  columnNames={personColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.surname}</p>
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
    {showNewModule && <NewAuthor postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditAuthor putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewAuthor editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Author
