import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function Availability() {
    const title = 'availability'
    const header = 'Availabilities'
    const [availabilities, setAvailabilities] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all availabilities from db
    const fetchAvailabilities = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setAvailabilities(data)})
        .catch(error=>{
          console.error('Error fetching availabilities', error);
        })
    }   
    //render array of sorted availabilities from sortcategories method which returns array of sorted array
    const sortedItems = sortItems(availabilities, selectedOption, isAscending);
    //render array from sorted availabilities that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchAvailabilities()
    },[])
    const props = {
      title,
      header,
      availabilities,
      setAvailabilities,
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

export default Availability


