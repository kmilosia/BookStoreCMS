import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

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
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setMethods(data)})
        .catch(error=>{
          console.error('Error fetching delivery methods', error);
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
      filteredItems
  };
  return (
    <DictionaryComponent {...props}/>
  )
}

export default PaymentMethod


