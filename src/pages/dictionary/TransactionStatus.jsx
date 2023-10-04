import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function TransactionStatus() {
    const title = 'transaction status'
    const header = 'Transaction Statuses'
    const [statuses, setStatuses] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all statuses from db
    const fetchStatuses = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setStatuses(data)})
        .catch(error=>{
          console.error('Error fetching transaction statuses', error);
        })
    }   
    //render array of sorted statuses from sort categories method which returns array of sorted array
    const sortedItems = sortItems(statuses, selectedOption, isAscending);
    //render array from sorted statuses that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchStatuses()
    },[])
    const props = {
      title,
      header,
      statuses,
      setStatuses,
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

export default TransactionStatus


