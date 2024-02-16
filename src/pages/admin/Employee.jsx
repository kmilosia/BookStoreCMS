import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import ViewEmployee from '../../modules/view/ViewEmployee'
import { employeeColumns } from '../../utils/column-names'
import { employeeSortOptions } from '../../utils/select-options'
import NewEmployee from '../../modules/new/NewEmployee'
import Spinner from '../../components/Spinner'
import ListHeader from '../../components/ListHeader'
import AddNewButton from '../../components/buttons/AddNewButton'
import Searchbar from '../../components/Searchbar'
import SortBar from '../../components/SortBar'
import axiosClient from '../../api/apiClient'
import { sortItems } from '../../utils/sort'
import { useMessageStore } from '../../store/messageStore'
import { getValidToken } from '../../api/getValidToken'
import { BsTrash3Fill } from 'react-icons/bs'
import EditEmployee from '../../modules/edit/EditEmployee'

function Employee() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [showViewModule, setShowViewModule] = useState(false)
    const [showEditModule, setShowEditModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const filterItems = (list, value) => list.filter((item) => {
        if (!value) {
            return true;
        }
        const itemName = item.username.toLowerCase()
        return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getItem = async (id,setData) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/Admin/Employees/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
        setData(response.data)
        }}
      }catch(err){
        console.log(err)
      }
    }
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.get(`/Admin/Employees`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }}
          setIsDataLoading(false)
      }catch(err){
        setIsDataLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/Admin/Register/Employee`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pracownik został dodany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania pracownika", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas dodawania pracownika", type: 'error'})
      }
    }
    const putData = async (data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/Admin/Employee/Edit`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pracownik został edytowany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania pracownika", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas edytowania pracownika", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/Admin/Employee/Delete?userId=${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Pracownik został usunięty", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania pracownika", type: 'error'})
          }}
        }catch(err){
          setMessage({title: "Błąd podczas usuwania pracownika", type: 'error'})
      }
    }
    const handleEditClick = (itemID) => {
      setEditedID(itemID)
      setShowEditModule(true)
   }
    const handleViewClick = (itemID) => {
      setEditedID(itemID)
      setShowViewModule(true)
    }
    const handleDeleteClick = (itemID) => {
      deleteData(itemID)
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Pracownik</h1>    
        <div className='filter-panel'>
          <SortBar options={employeeSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Pracownika"/>                   
        </div>
        <ListHeader columnNames={employeeColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map((item,index) => (             
            <div key={index} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.username}</p>
                <p className='px-2 break-words'>{item.email}</p>
                <p className='px-2'>{item?.roleName?.map((value, index) => {return(<span>{index > 0 && ' , '}{value}</span>)})}</p>
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
    {showNewModule && <NewEmployee postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditEmployee getItem={getItem} putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewEmployee getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default Employee
