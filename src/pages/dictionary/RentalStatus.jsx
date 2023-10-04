import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function RentalStatus() {
    const title = 'rental status'
    const header = 'Rental Statuses'
    const [statuses, setStatuses] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchStatuses = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setStatuses(data)})
        .catch(error=>{
          console.error('Error fetching rental statuses', error);
        })
    }   
    const sortedItems = sortItems(statuses, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
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

export default RentalStatus


