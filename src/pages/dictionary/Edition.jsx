import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function Edition() {
    const title = 'edition'
    const header = 'Editions'
    const [editions, setEditions] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchEditions = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setEditions(data)})
        .catch(error=>{
          console.error('Error fetching editions', error);
        })
    }   
    const sortedItems = sortItems(editions, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
    useEffect(()=>{
        fetchEditions()
    },[])
    const props = {
      title,
      header,
      editions,
      setEditions,
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

export default Edition


