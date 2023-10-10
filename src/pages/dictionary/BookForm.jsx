import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function BookForm() {
    const title = 'form'
    const header = 'Forms'
    const [forms, setForms] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all forms from db
    const fetchForms = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setForms(data)})
        .catch(error=>{
          console.error('Error fetching book forms', error);
        })
    }   
    //render array of sorted forms from sortcategories method which returns array of sorted array
    const sortedItems = sortItems(forms, selectedOption, isAscending);
    //render array from sorted forms that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchForms()
    },[])
    const props = {
      title,
      header,
      forms,
      setForms,
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

export default BookForm


