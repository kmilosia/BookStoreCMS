import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/new/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'
import { useMessageStore } from '../../store/messageStore'
import { getValidToken } from '../../api/getValidToken'
import { useAuthStore } from '../../store/authStore'

function OrderStatus() {
    const decodedToken = useAuthStore((state) => state.decodedToken)  
    const title = "Status Zamówienia"
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
          setIsDataLoading(true)
          const token = getValidToken()
          if(token){    
          const response = await axiosClient.get(`/OrderStatus`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }}
          setIsDataLoading(false)
      }catch(err){
          console.log(err)
          setIsDataLoading(false)
      }
    }
    const postData = async (name) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/OrderStatus`, {
              name: name,
          },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Status zamówienia został dodany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania statusu zamówienia", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas dodawania statusu zamówienia", type: 'error'})
      }
    }
    const putData = async (id, nameValue) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/OrderStatus/${id}`, {
              id: id,
              name: nameValue,
          },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Status zamówienia został edytowany", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania statusu zamówienia", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas edytowania statusu zamówienia", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/OrderStatus/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Status zamówienia został usunięty", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania statusu zamówienia", type: 'error'})
          }}
        }catch(err){
          setMessage({title: "Błąd podczas usuwania statusu zamówienia", type: 'error'})
        }
    }
    useEffect(()=>{
        getAllData()
    },[])
    
    const props = {
      title,
      data,
      setData,
      editedID,
      setEditedID,
      selectedOption,
      setSelectedOption,
      searchValue,
      setSearchValue,
      showNewModule,
      setShowNewModule,
      isAscending,
      setIsAscending,
      filteredItems,
      getAllData,
      postData,
      deleteData,
      putData,
      isDataLoading,
      writePermission: decodedToken?.OrderStatus?.includes('w') || decodedToken?.role === 'Admin',
      editPermission: decodedToken?.OrderStatus?.includes('e') || decodedToken?.role === 'Admin',
      deletePermission: decodedToken?.OrderStatus?.includes('d') || decodedToken?.role === 'Admin',
  };
  return (
    <>
        <DictionaryComponent {...props}/>
        {showNewModule && <NewDictionaryRecord title={title} setShowNewModule={setShowNewModule} postData={postData} />}
    </>
  )
}

export default OrderStatus


