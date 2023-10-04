import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/AddNewButton'
import { fetchAll } from '../api/fetchAPI'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { addressSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { addressColumnNames } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import EditAddress from '../modules/EditAddress'
import NewAddress from '../modules/NewAddress'
import ViewAddress from '../modules/ViewAddress'

function Address() {
    const title = 'address'
    const [addresses, setAddresses] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchAddresses = () => {
        const address = `v2/beers?size=6`
        fetchAll({address})
          .then(data => {setAddresses(data)})
          .catch(error=>{
            console.error('Error fetching addresses', error);
          })
    }     
    const sortedItems = sortItems(addresses, selectedOption, isAscending);
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
        fetchAddresses()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
        <h1 className='main-header'>Addresses</h1>    
        <div className='filter-panel'>
            <SortBar options={addressSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>                     
            <div className='flex-x'>
            <Searchbar setSearchValue={setSearchValue} title={title} />
            <AddNewButton setShowNewModule={setShowNewModule} title={title} /> 
            </div>  
        </div>
        <ListHeader columnNames={addressColumnNames} />      
        {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-6'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name} 3/25</p>
                <p className='px-2'>postcode</p>
                <p className='px-2'>city</p>
                <p className='px-2'>country</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick()} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
    </div>
    {showNewModule && <NewAddress setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditAddress editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewAddress setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Address
