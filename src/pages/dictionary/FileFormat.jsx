import React, { useEffect, useState } from 'react'
import { fetchAll } from '../../api/fetchAPI'
import { sortItems } from '../../utils/sort'
import { filterItems } from '../../utils/filter'
import DictionaryComponent from './DictionaryComponent'

function FileFormat() {
    const title = 'file format'
    const header = 'File Formats'
    const [formats, setFormats] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showNewModule, setShowNewModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    //fetch all formats from db
    const fetchFormats = () => {
      const address = `v2/beers?size=6`
        fetchAll({address})
        .then(data => {setFormats(data)})
        .catch(error=>{
          console.error('Error fetching file formats', error);
        })
    }   
    //render array of sorted formats from sortcategories method which returns array of sorted array
    const sortedItems = sortItems(formats, selectedOption, isAscending);
    //render array from sorted formats that will be filtered by value from searchbar
    const filteredItems = filterItems(sortedItems, searchValue);
    //render page
    useEffect(()=>{
        fetchFormats()
    },[])
    const props = {
      title,
      header,
      formats,
      setFormats,
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

export default FileFormat


