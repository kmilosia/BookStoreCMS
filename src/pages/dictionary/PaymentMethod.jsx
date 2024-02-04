import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/new/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'
import { useMessageStore } from '../../store/messageStore'

function PaymentMethod() {
    const title = "Metoda Płatności"
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
          const response = await axiosClient.get(`/PaymentMethod`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }
          setIsDataLoading(false)
      }catch(err){
          console.log(err)
          setIsDataLoading(false)
      }
    }
    const postData = async (name) => {
      try{
          const response = await axiosClient.post(`/PaymentMethod`, {
              name: name,
          })
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Forma płatności została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania metody płatności", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas dodawania metody płatności", type: 'error'})
      }
    }
    const putData = async (id, nameValue) => {
      try{
          const response = await axiosClient.put(`/PaymentMethod/${id}`, {
              id: id,
              name: nameValue,
          })
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Forma płatności została edytowana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas edytowania metody płatności", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas edytowania metody płatności", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/PaymentMethod/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Forma płatności została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania metody płatności", type: 'error'})
          }
        }catch(err){
          setMessage({title: "Błąd podczas usuwania metody płatności", type: 'error'})
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
      isDataLoading
  };
  return (
    <>
        <DictionaryComponent {...props}/>
        {showNewModule && <NewDictionaryRecord title={title} setShowNewModule={setShowNewModule} postData={postData} />}
    </>
  )
}

export default PaymentMethod


