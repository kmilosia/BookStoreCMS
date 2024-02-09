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
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import axiosClient from '../api/apiClient'

function Author() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [isAscending, setIsAscending] = useState(true)
    const [module, setModule] = useState(null)
    const [loading, setLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getItem = async (id, setData) => {
      try{
        const response = await axiosClient.get(`/Author/${id}`)
        if(response.status === 200 || response.status === 204){
          setData(response.data)
        }
      }catch(e){
        console.log(e)
      }
    }
    const getAllData = async () => {
      try{
        setLoading(true)
          const response = await axiosClient.get(`/Author`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setLoading(false)
      }catch(err){
        setLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Author/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Autor został usunięty", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania danych", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas usuwania danych", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
          const response = await axiosClient.post(`/Author`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Autor został dodany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania autora", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas dodawania autora", type: 'error'})
      }
    }
    const putData = async (data) => {
      try{
          const response = await axiosClient.put(`/Author/${data.id}`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Autor został edytowany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania autora", type: 'error'})
          }
      }catch(e){
        setMessage({title: "Błąd podczas edytowania autora", type: 'error'})
      }
    }
    const handleAfterSubmit = () => {
      setModule(null)
      setEditedID(null)
    }
    const handleCloseModule = () => {
      setEditedID(null)
      setModule(null)
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
          <AddNewButton setShowNewModule={() => setModule('new')} title="Autora"/>  
        </div>
        <ListHeader columnNames={personColumns}/>
      </div>
      {loading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.surname}</p>
                <div className='flex justify-end'>
                  <button onClick={() => {setEditedID(item.id); setModule('view')}} className='table-button'><AiFillEye /></button>
                  <button onClick={() => {setEditedID(item.id);setModule('edit')}} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => {deleteData(item.id);}} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
      }
      </div>
      {module === 'new' ? <NewAuthor handleAfterSubmit={handleAfterSubmit} handleCloseModule={handleCloseModule} postData={postData}/> 
      : module === 'edit' ? <EditAuthor getItem={getItem} handleAfterSubmit={handleAfterSubmit} handleCloseModule={handleCloseModule} editedID={editedID} putData={putData}/> 
      : module === 'view' ? <ViewAuthor getItem={getItem} handleCloseModule={handleCloseModule} editedID={editedID}/> 
      : ''}
    </>
  )
}

export default Author
