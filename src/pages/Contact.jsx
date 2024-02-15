import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import { sortItems } from '../utils/sort'
import { contactSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { contactColumns } from '../utils/column-names'
import { TbWriting } from "react-icons/tb";
import axiosClient from '../api/apiClient'
import Spinner from '../components/Spinner'
import { useMessageStore } from '../store/messageStore'
import ContactAnswer from '../modules/user/ContactAnswer'
import { getValidToken } from '../api/getValidToken'
import { useAuthStore } from '../store/authStore'

function Contact() {
    const decodedToken = useAuthStore((state) => state.decodedToken)
    const [data, setData] = useState([])
    const [itemId, setItemId] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showModule, setShowModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const filterItems = (list, value) => list.filter((item) => {
      if (!value) {
          return true;
      }
      const itemName = item.clientName.toLowerCase()
      return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.get(`/Contact`,{
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
          setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const handleAnswer = (id) => {
      setItemId(id)
      setShowModule(true)
    }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Kontakt</h1>    
        <div className='filter-panel'>
          <SortBar options={contactSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
        </div>
        <ListHeader columnNames={contactColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.clientName}</p>
                <p className='px-2'>{item.email}</p>
                <div className='flex justify-end'>
                {(decodedToken?.Contact?.includes('w') || decodedToken?.role === 'Admin') &&                                          
                  <button onClick={() => handleAnswer(item.id)} className='table-button'><TbWriting /></button>}
                </div>        
                <div className='flex flex-col col-span-4 text-sm border-t dark:border-dracula-600 mt-2 pt-2'>
                    <p>Wiadomość</p>                       
                    <p className='font-semibold'>{item.content}</p>                       
                </div>     
            </div>        
        ))}
      </div>
      }
    </div>
    {showModule && <ContactAnswer itemId={itemId} setShowModule={setShowModule} setItemId={setItemId}/>}
    </>
  )
}

export default Contact
