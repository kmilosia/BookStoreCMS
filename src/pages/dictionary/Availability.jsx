import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/new/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'
import { useMessageStore } from '../../store/messageStore'
import { getValidToken } from '../../api/getValidToken'
import { useAuthStore } from '../../store/authStore'

function Availability() {
    const decodedToken = useAuthStore((state) => state.decodedToken)  
    const title = "Dostępność"
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
          const response = await axiosClient.get(`/Availability`,{
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
          const response = await axiosClient.post(`/Availability`, {
              name: name,
          },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Nowa dostępność została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd przy dodawaniu nowej dostępności", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd przy dodawaniu nowej dostępności", type: 'error'})
      }
    }
    const putData = async (id, nameValue) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/Availability/${id}`, {
              id: id,
              name: nameValue,
          },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Dostępność została edytowana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania dostępności", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas edytowania dostępności", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/Availability/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Dostępność została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania dostępności", type: 'error'})
          }}
        }catch(err){
          setMessage({title: "Błąd podczas usuwania dostępności", type: 'error'})
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
      writePermission: decodedToken?.Availability?.includes('w') || decodedToken?.role === 'Admin',
      editPermission: decodedToken?.Availability?.includes('e') || decodedToken?.role === 'Admin',
      deletePermission: decodedToken?.Availability?.includes('d') || decodedToken?.role === 'Admin',
  };
  return (
    <>
        <DictionaryComponent {...props}/>
        {showNewModule && <NewDictionaryRecord title={title} setShowNewModule={setShowNewModule} postData={postData} />}
    </>
  )
}

export default Availability


