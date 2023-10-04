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
import {  deliveryMethodColumnNames } from '../utils/column-names'
import NewDeliveryMethod from '../modules/NewDeliveryMethod'
import EditDeliveryMethod from '../modules/EditDeliveryMethod'
import ViewDeliveryMethod from '../modules/ViewDeliveryMethod'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'

function DeliveryMethod() {
    const title = 'delivery method'
    const [methods, setMethods] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchMethods = () => {
        const address = `v2/beers?size=6`
        fetchAll({address})
          .then(data => {setMethods(data)})
          .catch(error=>{
            console.error('Error fetching delivery methods', error);
          })
    }     
    const sortedItems = sortItems(methods, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
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
        fetchMethods()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
        <h1 className='main-header'>Delivery Methods</h1>    
        <div className='filter-panel'>
            <SortBar options={authorSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>                     
            <div className='flex-x'>
            <Searchbar setSearchValue={setSearchValue} title={title} />
            <AddNewButton setShowNewModule={setShowNewModule} title={title} /> 
            </div>  
        </div>
        <ListHeader columnNames={deliveryMethodColumnNames} />      
        {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>$90.00</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick()} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
    </div>
    {showNewModule && <NewDeliveryMethod setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditDeliveryMethod editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewDeliveryMethod setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default DeliveryMethod
