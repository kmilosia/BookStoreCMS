import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function Language() {
    const title = 'language'
    const header = 'Languages'
    const [languages, setLanguages] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchLanguages = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setLanguages(data)})
        .catch(error=>{
          console.error('Error fetching languages', error);
        })
    }   
    const sortedItems = sortItems(languages, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
    useEffect(()=>{
        fetchLanguages()
    },[])
    const props = {
      title,
      header,
      languages,
      setLanguages,
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

export default Language


