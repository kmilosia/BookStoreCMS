import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { discountsBannerSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { discountsBannerColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import NewDiscountsBanner from '../modules/new/NewDiscountsBanner'
import EditDiscountsBanner from '../modules/edit/EditDiscountsBanner'
import ViewDiscountsBanner from '../modules/view/ViewDiscountsBanner'

function DiscountsBanner() {
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
          const response = await axiosClient.get(`/DiscountsBanner`)
          setData(response.data)
          setIsDataLoading(false)

      }catch(err){
          console.error(err)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/DiscountsBanner`, object)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/DiscountsBanner/${id}`)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/DiscountsBanner/${id}`, object)
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
        <h1 className='main-header'>Baner promocyjny</h1>    
        <div className='filter-panel'>
          <SortBar options={discountsBannerSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Baner"/>                   
        </div>
        <ListHeader  columnNames={discountsBannerColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.header}</p>
                <img className='h-auto object-contain px-2' src={item.imageURL} />
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
    {showNewModule && <NewDiscountsBanner postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditDiscountsBanner putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewDiscountsBanner editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default DiscountsBanner
