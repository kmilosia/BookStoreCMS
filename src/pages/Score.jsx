import React, { useRef } from 'react'
import SortBar from '../components/SortBar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { scoreSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { scoreColumns } from '../utils/column-names'
import { AiFillEdit } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import NewScore from '../modules/new/NewScore'
import { FaSave } from 'react-icons/fa'

function Score() {
    const inputRef = useRef(null)
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)  
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Score`)
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
          const response = await axiosClient.delete(`/Score/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Ocena została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania oceny", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas usuwania oceny", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
          const response = await axiosClient.post(`/Score`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Ocena została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania oceny", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas dodawania oceny", type: 'error'})
      }
    }
    const putData = async (id,data) => {
      try{
          const response = await axiosClient.put(`/Score/${id}`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Ocena została edytowana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania oceny", type: 'error'})
          }
      }catch(e){
        setMessage({title: "Błąd podczas edytowania oceny", type: 'error'})
      }
    }
    const handleEditClick = (itemID, value) => {
        if (editedID === null){
          setEditedID(itemID)
          setValue(value)
        }else{
          setEditedID(null)
          setValue('')
        }
      }
      const handleInputChange = (e) => {
        setValue(e.target.value)
      }
      const handleSaveClick = (id) => {
        if(value === ''){
          setError("Wartość nie może być pusta")
        }else{
        if(error){
          setError(null)
        }
        putData(id, {value})
        setEditedID(null)
        }
      }
    const handleDeleteClick = (itemID) => {
        deleteData(itemID)
    }
    useEffect(() => {
        if (editedID !== null){
          inputRef.current.focus()
        }
      }, [editedID])
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Ocena</h1>    
        <div className='filter-panel'>
          <SortBar options={scoreSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <AddNewButton setShowNewModule={setShowNewModule} title="Ocenę"/>                   
        </div>
        <ListHeader columnNames={scoreColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {sortedItems.map(item => (             
            <div key={item.id} className='table-row-wrapper'>
                <p className='px-2'>{item.id}</p>  
                {editedID !== null && editedID === item.id ? (
                  <div className='flex flex-col'>
                  <input
                    ref={inputRef}
                    type='text'
                    onChange={handleInputChange}
                    value={value}
                    className='module-input-text'
                  />
                  {error && <p className='error-text'>{error}</p>}
                  </div>
                ) : (
                  <p className='px-2'>{item.value}</p>
                )}                     
                <div className='flex justify-end'>
                  {editedID !== null && editedID === item.id && (
                    <button onClick={() => handleSaveClick(item.id)} className='table-button'>
                      <FaSave />
                    </button>
                  )}
                  <button onClick={() => handleEditClick(item.id, item.value)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
      }
        </div>
    {showNewModule && <NewScore postData={postData} setShowNewModule={setShowNewModule}/>}
    </>
  )
}

export default Score
