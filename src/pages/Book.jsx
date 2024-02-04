import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { bookSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { bookColumns } from '../utils/column-names'
import NewBook from '../modules/new/NewBook'
import EditBook from '../modules/edit/EditBook'
import ViewBook from '../modules/view/ViewBook'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'

function Book() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const filterItems = (list, value) => list.filter((item) => {
      if (!value) {
          return true;
      }
      const itemName = item.title.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)

    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Book`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
        setIsDataLoading(false)
      }
    }
    const postData = async (object) => {
      try{
          const response = await axiosClient.post(`/Book`, object)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Książka została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania książki", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas dodawania książki", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Book/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Książka została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania książki", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas usuwania książki", type: 'error'})
      }
    }
    const putData = async (id, object) => {
      try{
          const response = await axiosClient.put(`/Book/${id}`, object)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Książka została edytowana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania książki", type: 'error'})
          }
        } catch (err) {
          setMessage({title: "Błąd podczas edytowania książki", type: 'error'})
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
        <h1 className='main-header'>Książka</h1>    
        <div className='filter-panel'>
          <SortBar options={bookSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Książkę"/>                   
        </div>
        <ListHeader  columnNames={bookColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map((item) => (             
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
      }
        </div>
    {showNewModule && <NewBook postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditBook putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewBook editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Book
