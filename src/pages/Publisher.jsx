import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { dictionarySortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { dictionaryColumns } from '../utils/column-names'
import NewPublisher from '../modules/new/NewPublisher'
import EditPublisher from '../modules/edit/EditPublisher'
import ViewPublisher from '../modules/view/ViewPublisher'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'

function Publisher() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getItem = async (id,setPublisher) => {
      try{
        const response = await axiosClient.get(`/Publisher/${id}`)
        if(response.status === 200 || response.status === 204){
        setPublisher(response.data)
        }
      }catch(err){
        console.log(err)
      }
    }
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Publisher`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
        setIsDataLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Publisher/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Wydawnictwo zostało usunięte", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania wydawnictwa", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas usuwania wydawnictwa", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
          const response = await axiosClient.post(`/Publisher`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Wydawnictwo zostało dodane", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania wydawnictwa", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas dodawania wydawnictwa", type: 'error'})
      }
    }
    const putData = async (id,data) => {
      try{
          const response = await axiosClient.put(`/Publisher/${id}`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Wydawnictwo zostało edytowane", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania wydawnictwa", type: 'error'})
          }
      }catch(e){
        setMessage({title: "Błąd podczas edytowania wydawnictwa", type: 'error'})
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
        <h1 className='main-header'>Wydawnictwo</h1>    
        <div className='filter-panel'>
          <SortBar options={dictionarySortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Wydawnictwo"/>                   
        </div>
        <ListHeader  columnNames={dictionaryColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-3'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
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
    {showNewModule && <NewPublisher postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditPublisher getItem={getItem} putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewPublisher getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Publisher
