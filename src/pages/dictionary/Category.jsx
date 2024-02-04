import React, { useEffect, useState } from 'react'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import NewDictionaryRecord from '../../modules/new/NewDictionaryRecord'
import axiosClient from '../../api/apiClient'
import { useMessageStore } from '../../store/messageStore'

function Category() {
    const title = "Kategoria"
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Category`)
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
          const response = await axiosClient.post(`/Category`, {
              name: name,
          })
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Nowa kategoria została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd przy dodawaniu nowej kategorii", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas dodawania kategorii", type: 'error'})
      }
    }
    const putData = async (id, nameValue) => {
      try{
          const response = await axiosClient.put(`/Category/${id}`, {
              id: id,
              name: nameValue,
          })
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Kategoria została edytowana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd przy edytowaniu kategorii", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas edytowania kategorii", type: 'error'})
      }
    }
    const deleteData = async (id) => {
      try{
          const response = await axiosClient.delete(`/Category/${id}`)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Kategoria została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd przy usuwaniu kategorii", type: 'error'})
          }
      }catch(err){
        setMessage({title: "Błąd podczas usuwania kategorii", type: 'error'})
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

export default Category


