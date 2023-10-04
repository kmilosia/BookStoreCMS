import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function City() {
    const title = 'city'
    const header = 'Cities'
    const [cities, setCities] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchCities = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setCities(data)})
        .catch(error=>{
          console.error('Error fetching cities', error);
        })
    }   
    const sortedItems = sortItems(cities, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
    useEffect(()=>{
        fetchCities()
    },[])
    const props = {
      title,
      header,
      cities,
      setCities,
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

export default City


