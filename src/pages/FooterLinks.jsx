import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { footerLinksSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { footerLinkColumns } from '../utils/column-names'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../api/apiClient'
import NewFooterLink from '../modules/new/NewFooterLink'
import EditFooterLink from '../modules/edit/EditFooterLink'
import ViewFooterLink from '../modules/view/ViewFooterLink'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'

function FooterLinks() {
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
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/FooterLinks`)
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
          const response = await axiosClient.delete(`/FooterLinks/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Link footera został usunięty", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania linku", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas usuwania linku", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
          const response = await axiosClient.post(`/FooterLinks`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Link footera został dodany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania linku", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas dodawania linku", type: 'error'})
      }
    }
    const putData = async (id,data) => {
      try{
          const response = await axiosClient.put(`/FooterLinks/${id}`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Link footera został edytowany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania linku", type: 'error'})
          }
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
        <h1 className='main-header'>Link Footera</h1>    
        <div className='filter-panel'>
          <SortBar options={footerLinksSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
          <AddNewButton setShowNewModule={setShowNewModule} title="Link Footera"/>                   
        </div>
        <ListHeader columnNames={footerLinkColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.columnName}</p>
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
    {showNewModule && <NewFooterLink postData={postData} setShowNewModule={setShowNewModule}/>}
    {showEditModule && <EditFooterLink putData={putData} editedID={editedID} setEditedID={setEditedID} setShowEditModule={setShowEditModule}/>}
    {showViewModule && <ViewFooterLink editedID={editedID} setShowViewModule={setShowViewModule} setEditedID={setEditedID}/>}
    </>
  )
}

export default FooterLinks
