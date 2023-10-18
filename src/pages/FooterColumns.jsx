import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/AddNewButton'
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

function FooterColumns() {
    const [columns, setColumns] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
   
    const sortedItems = sortItems(columns, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);

    const getAllData = async () => {
      try{
          const response = await axiosClient.get(`/FooterColumns`)
          setColumns(response.data)
          console.log(response.data);
      }catch(err){
          console.error(err)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/FooterColumns`, object)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/FooterColumns/${id}`)
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/FooterColumns/${id}`, object)
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
        <h1 className='main-header'>Footer Kolumna</h1>    
        <div className='flex flex-row justify-end my-4'>
          <SortBar options={footerColumnsSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Footer Kolumnę"/>                   
        </div>
        <ListHeader  columnNames={footerColumns}/>
      </div>
      <div className='w-full overflow-auto scrollbar-default'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.position}</p>
                <p className='px-2'>{item.htmlObject}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
        </div>
    {showNewModule && <NewFooterColumn postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditFooterColumn putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewFooterColumn editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default FooterColumns
