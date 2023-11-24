import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { supplierSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { supplierColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import NewSupplier from '../modules/new/NewSupplier'
import EditSupplier from '../modules/edit/EditSupplier'
import ViewSupplier from '../modules/view/ViewSupplier'

function Supplier() {
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
          const response = await axiosClient.get(`/Supplier`)
          setData(response.data)
          setIsDataLoading(false)
      }catch(err){
          console.error(err)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/Supplier`, object)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Supplier/${id}`)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/Supplier/${id}`, object)
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
        <h1 className='main-header'>Dostawca</h1>    
        <div className='filter-panel'>
          <SortBar options={supplierSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Dostawcę"/>                   
        </div>
        <ListHeader  columnNames={supplierColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.email}</p>
                <p className='px-2'>{item.phoneNumber}</p>
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
    {showNewModule && <NewSupplier postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditSupplier putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewSupplier editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Supplier
