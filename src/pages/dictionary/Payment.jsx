import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import axios from 'axios'
import NewDictionaryRecord from '../../modules/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'

function Payment() {
    const table = 'PaymentMethod'
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)

    const sortedItems = sortItems(data, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);

    const getAllData = async () => {
      try{
          const response = await axiosClient.get(`/PaymentMethod`)
          console.log(response.data);
          setData(response.data)
      }catch(err){
          console.error(err)
      }
  }
  
   const postData = async (name) => {
      try{
          const response = await axiosClient.post(`/PaymentMethod`, {
              name: name,
          })
          getAllData()
      }catch(err){
          console.error(err)
      }
  }
  
   const putData = async (id, name) => {
      try{
          const response = await axiosClient.put(`/PaymentMethod/${id}`, {
              name: name,
          })
          getAllData()
      }catch(err){
          console.error(err)
      }
  }
  
   const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/PaymentMethod/${id}`)
          getAllData()
      }catch(err){
          console.error(err)
      }
  }

    useEffect(()=>{
        getAllData()
    },[])
    const props = {
      table,
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
      putData
  };
  return (
    <>
        <DictionaryComponent {...props}/>
        {showNewModule && <NewDictionaryRecord postData={postData} setShowNewModule={setShowNewModule} table={table}/>}
    </>
  )
}

export default Payment


