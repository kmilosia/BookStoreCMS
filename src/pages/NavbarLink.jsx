import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { navbarLinksSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { navbarLinksColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import NewNavbarLink from '../modules/new/NewNavbarLink'
import EditNavbarLink from '../modules/edit/EditNavbarLink'
import ViewNavbarLink from '../modules/view/ViewNavbarLink'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'
import { useAuthStore } from '../store/authStore'

function NavbarLink() {
    const decodedToken = useAuthStore((state) => state.decodedToken)
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
    const getItem = async (id,setData) => {
      try{
        const token = getValidToken()
        if(token){  
        const response = await axiosClient.get(`/NavBarMenuLinks/${id}`,{
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
          const response = await axiosClient.get(`/NavBarMenuLinks`,{
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
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/NavBarMenuLinks/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Link został usunięty", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania linku", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas usuwania linku", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/NavBarMenuLinks`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Link został dodany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania linku", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas dodawania linku", type: 'error'})
      }
    }
    const putData = async (id,data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/NavBarMenuLinks/${id}`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Link został edytowany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania linku", type: 'error'})
          }}
      }catch(e){
        setMessage({title: "Błąd podczas edytowania linku", type: 'error'})
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
        <h1 className='main-header'>Menu Linki</h1>    
        <div className='filter-panel'>
          <SortBar options={navbarLinksSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/> 
          {(decodedToken?.NavBarMenuLinks?.includes('w') || decodedToken?.role === 'Admin') &&                                   
          <AddNewButton setShowNewModule={setShowNewModule} title="Link Menu"/>}                   
        </div>
        <ListHeader  columnNames={navbarLinksColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-5'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.path}</p>
                <p className='px-2'>{item.position}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleViewClick(item.id)} className='table-button'><AiFillEye /></button>
                  {(decodedToken?.NavBarMenuLinks?.includes('e') || decodedToken?.role === 'Admin') &&                           
                  <button onClick={() => handleEditClick(item.id)} className='table-button'><AiFillEdit /></button>}
                  {(decodedToken?.NavBarMenuLinks?.includes('d') || decodedToken?.role === 'Admin') &&                           
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>}
                </div>             
            </div>        
        ))}
      </div>
      }
        </div>
    {showNewModule && <NewNavbarLink postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditNavbarLink getItem={getItem} putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewNavbarLink getItem={getItem} editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default NavbarLink
