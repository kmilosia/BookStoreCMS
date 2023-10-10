import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'
import axios from 'axios'

function PaymentMethod() {
    const title = 'payment method'
    const header = 'Payment Methods'
    const [methods, setMethods] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchMethods = () => {
      axios.get('https://localhost:7247/api/PaymentMethod')
      .then(response => {
        console.log(response.data);
        setMethods(response.data);
      })
      .catch(error => {
        console.error(error);
      })        
    } 
    const editMethod = () => {

    }  
    const addMethod = (nameValue) => {
      axios.post('https://localhost:7247/api/PaymentMethod', {
        name: nameValue,
      })
      .then(response => {
        console.log('New payment method has been added');
        fetchMethods()
      })
      .catch(error => {
        console.error(error)
      })
    }
    const deleteMethod = (id) => {
      axios.delete(`https://localhost:7247/api/PaymentMethod/${id}`)
      .then(response => {
        console.log(`Payment method with ID ${id} has been deleted`);
        fetchMethods()
      })
      .catch(error => {
        console.error(error)
      })
    }
    const sortedItems = sortItems(methods, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
    useEffect(()=>{
        fetchMethods()
    },[])
    const props = {
      title,
      header,
      methods,
      setMethods,
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
      deleteMethod,
      fetchMethods,
      addMethod,
      editMethod
  };
  return (
    <DictionaryComponent {...props}/>
  )
}

export default PaymentMethod


