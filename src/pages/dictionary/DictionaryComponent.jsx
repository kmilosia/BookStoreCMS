import React from 'react'
import SortBar from '../../components/SortBar'
import Searchbar from '../../components/Searchbar'
import AddNewButton from '../../components/AddNewButton'
import { dictionarySortOptions } from '../../utils/select-options'
import ListHeader from '../../components/ListHeader'
import { dictionaryColumnNames } from '../../utils/column-names'
import { AiFillEdit } from 'react-icons/ai'
import { FaSave } from 'react-icons/fa'
import { BsTrash3Fill } from 'react-icons/bs'
import { useState } from 'react'

function DictionaryComponent(props) {
const [nameValue, setNameValue] = useState('')
const handleEditClick = (itemID, itemName) => {
    if(props.editedID === null){
    props.setEditedID(itemID)
    setNameValue(itemName)
    }else{
      props.setEditedID(null)
      setNameValue('')
    }
}
const handleInputChange = (e) => {
  setNameValue(e.target.value)
}
const handleSaveClick = (id) => {
    props.putData(id,nameValue)
    props.setEditedID(null)
}
const handleDeleteClick = (id) => {
  props.deleteData(id)
}
const title = props.table.split(/(?=[A-Z])/).join(" ");

  return (
    <>
    <div className='main-wrapper'>
        <h1 className='main-header'>{title}</h1>    
        <div className='filter-panel'>
            <SortBar options={dictionarySortOptions} setSelectedOption={props.setSelectedOption} selectedOption={props.selectedOption} isAscending={props.isAscending} setIsAscending={props.setIsAscending}/>                     
            <div className='flex-x'>
            <Searchbar setSearchValue={props.setSearchValue} title={title} />
            <AddNewButton setShowNewModule={props.setShowNewModule} title={title} /> 
            </div>  
        </div>
        <ListHeader  columnNames={dictionaryColumnNames}/>
            {props.filteredItems.map(item => (             
              <div key={item.id} className='table-row-wrapper'>
                <p className='px-2'>{item.id}</p>
                {props.editedID !== null && props.editedID === item.id ?
                <input type='text' onChange={handleInputChange} value={nameValue} className='bg-saphire-100 px-2 py-2 rounded-md dark:bg-gray-800'/> :                 
                <p className='px-2'>{item.name}</p>      
                }         
                <div className='flex justify-end'>
                  {props.editedID !== null && props.editedID === item.id && <button onClick={() => handleSaveClick(item.id)} className='table-button'><FaSave /></button>} 
                  <button onClick={() => handleEditClick(item.id, item.name)} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => handleDeleteClick(item.id)} className='table-button'><BsTrash3Fill /></button>
                </div>              
              </div>            
            ))}
        </div>
        </>
  )
}

export default DictionaryComponent
