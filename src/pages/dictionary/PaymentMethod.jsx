import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/new/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'

function PaymentMethod() {
    const title = "Forma Płatności"
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
    const putData = async (id, nameValue) => {
      try{
          const response = await axiosClient.put(`/PaymentMethod/${id}`, {
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
      putData
  };
  return (
    <>
        <DictionaryComponent {...props}/>
        {showNewModule && <NewDictionaryRecord title={title} setShowNewModule={setShowNewModule} postData={postData} />}
    </>
  )
}

export default PaymentMethod


