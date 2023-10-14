import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'

function AccountStatus() {
    const table = "AccountStatus"
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
          const response = await axiosClient.get(`/AccountStatus`)
          setData(response.data)
      }catch(err){
          console.error(err)
      }
    }
    const postData = async (name) => {
      try{
          const response = await axiosClient.post(`/AccountStatus`, {
              name: name,
          })
          getAllData()
      }catch(err){
          console.error(err)
      }
    }
    const putData = async (id, nameValue) => {
      try{
          const response = await axiosClient.put(`/AccountStatus/${id}`, {
              id: id,
              name: nameValue,
          })
          getAllData()
      }catch(err){
        console.error(err)
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/AccountStatus/${id}`)
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
        {showNewModule && <NewDictionaryRecord table={table} setShowNewModule={setShowNewModule} postData={postData} />}
    </>
  )
}

export default AccountStatus


