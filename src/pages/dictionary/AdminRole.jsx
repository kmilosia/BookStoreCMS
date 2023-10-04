import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function AdminRole() {
    const title = 'admin role'
    const header = 'Admin Roles'
    const [roles, setRoles] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all roles from db
    const fetchRoles = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setRoles(data)})
        .catch(error=>{
          console.error('Error fetching admin roles', error);
        })
    }   
    //render array of sorted roles from sortcategories method which returns array of sorted array
    const sortedItems = sortItems(roles, selectedOption, isAscending);
    //render array from sorted roles that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchRoles()
    },[])
    const props = {
      title,
      header,
      roles,
      setRoles,
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

export default AdminRole


