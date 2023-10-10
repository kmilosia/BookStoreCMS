import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function Permission() {
    const title = 'permission'
    const header = 'Permissions'
    const [permissions, setPermissions] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all genders from db
    const fetchPermissions = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setPermissions(data)})
        .catch(error=>{
          console.error('Error fetching permissions', error);
        })
    }   
    //render array of sorted genders from sortcategories method which returns array of sorted array
    const sortedItems = sortItems(permissions, selectedOption, isAscending);
    //render array from sorted genders that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchPermissions()
    },[])
    const props = {
      title,
      header,
      permissions,
      setPermissions,
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

export default Permission


