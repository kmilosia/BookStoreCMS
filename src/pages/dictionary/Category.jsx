import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function Category() {
    const title = 'category'
    const header = 'Categories'
    const [categories, setCategories] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all categories from db
    const fetchCategories = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setCategories(data)})
        .catch(error=>{
          console.error('Error fetching category', error);
        })
    }   
    //render array of sorted categories from sortcategories method which returns array of sorted array
    const sortedItems = sortItems(categories, selectedOption, isAscending);
    //render array from sorted categories that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchCategories()
    },[])
    const props = {
      title,
      header,
      categories,
      setCategories,
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

export default Category


