import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function Country() {
    const title = 'country'
    const header = 'Countries'
    const [countries, setCountries] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const fetchCountries = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setCountries(data)})
        .catch(error=>{
          console.error('Error fetching countries', error);
        })
    }   
    const sortedItems = sortItems(countries, selectedOption, isAscending);
    const filteredItems = filterItems(sortedItems, searchValue);
    useEffect(()=>{
        fetchCountries()
    },[])
    const props = {
      title,
      header,
      countries,
      setCountries,
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

export default Country


