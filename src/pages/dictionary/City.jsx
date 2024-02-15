import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/new/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'
import { useMessageStore } from '../../store/messageStore'
import { getValidToken } from '../../api/getValidToken'
import { useAuthStore } from '../../store/authStore'

function City() {
    const decodedToken = useAuthStore((state) => state.decodedToken)  
    const title = "Miasto"
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
          const response = await axiosClient.get(`/City`,{
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
          const response = await axiosClient.post(`/City`, {
              name: name,
          },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Miasto zostało dodane", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd przy dodawaniu miasta", type: 'error'})
          }}
      }catch(err){
          setMessage({title: "Błąd przy dodawaniu miasta", type: 'error'})
      }
    }
    const putData = async (id, nameValue) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.put(`/City/${id}`, {
              id: id,
              name: nameValue,
          },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Miasto zostało edytowane", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania miasta", type: 'error'})
          }}
      }catch(err){
        setMessage({title: "Błąd podczas edytowania miasta", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/City/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Miasto zostało usunięte", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania miasta", type: 'error'})
          }}
        }catch(err){
          setMessage({title: "Błąd podczas usuwania miasta", type: 'error'})
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
      writePermission: decodedToken?.City?.includes('w') || decodedToken?.role === 'Admin',
      editPermission: decodedToken?.City?.includes('e') || decodedToken?.role === 'Admin',
      deletePermission: decodedToken?.City?.includes('d') || decodedToken?.role === 'Admin',
    }
  return (
    <>
        <DictionaryComponent {...props}/>
        {showNewModule && <NewDictionaryRecord title={title} setShowNewModule={setShowNewModule} postData={postData} />}
    </>
  )
}

export default City


