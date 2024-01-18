import React from 'react'
import SortBar from '../components/SortBar'
import Searchbar from '../components/Searchbar'
import AddNewButton from '../components/buttons/AddNewButton'
import { sortItems } from '../utils/sort'
import { filterItems } from '../utils/filter'
import { personSortOptions } from '../utils/select-options'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../components/ListHeader'
import { personColumns } from '../utils/column-names'
import NewAuthor from '../modules/new/NewAuthor'
import EditAuthor from '../modules/edit/EditAuthor'
import { AiFillEdit, AiFillEye, AiOutlineClose } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
import ViewAuthor from '../modules/view/ViewAuthor'
import Spinner from '../components/Spinner'
import { deleteAuthor, getAuthors } from '../api/authorAPI'
import { HiOutlineSearch } from 'react-icons/hi'

function Author() {
    const [data, setData] = useState([])
    const [editedID, setEditedID] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [isAscending, setIsAscending] = useState(true)
    const [module, setModule] = useState(null)
    const [loading, setLoading] = useState(false)
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)

    const handleAfterSubmit = () => {
      setModule(null)
      setEditedID(null)
      getAuthors(setData,setLoading)
    }
    const handleCloseModule = () => {
      setEditedID(null)
      setModule(null)
    }
    const handleSearchChange = (e) => {
      setSearchValue(e.target.value)
    }  
    const handleClearInput = () => {
      setSearchValue('')
    }
    useEffect(()=>{
        getAuthors(setData, setLoading)
    },[])
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Autor</h1>    
        <div className='filter-panel'>
          <SortBar options={personSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <div className='relative mx-2'>
            <input value={searchValue} onChange={handleSearchChange} className='rounded-md pl-3 pr-12 py-2 bg-dracula-100 outline-none text-dracula-600 placeholder:text-dracula-400 dark:placeholder:text-dracula-500 dark:bg-dracula-700 dark:text-dracula-100' placeholder="Szukaj..." type='text'/>
              {searchValue !== '' ? 
              <button onClick={handleClearInput} className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-dracula-400 dark:text-dracula-500 hover:text-dracula-600 dark:hover:text-dracula-200'><AiOutlineClose /></button>
              : <span className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg text-dracula-400 dark:text-dracula-500'><HiOutlineSearch /></span>}
          </div>      
          <AddNewButton setShowNewModule={() => setModule('new')} title="Autora"/>  
                         
        </div>
        <ListHeader columnNames={personColumns}/>
      </div>
      {loading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-4'>
                <p className='px-2'>{item.id}</p>                       
                <p className='px-2'>{item.name}</p>
                <p className='px-2'>{item.surname}</p>
                <div className='flex justify-end'>
                  <button onClick={() => {setEditedID(item.id); setModule('view')}} className='table-button'><AiFillEye /></button>
                  <button onClick={() => {setEditedID(item.id);setModule('edit')}} className='table-button'><AiFillEdit /></button>
                  <button onClick={() => {deleteAuthor(item.id);getAuthors(setData,setLoading);}} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
      }
      </div>
      {module === 'new' ? <NewAuthor handleAfterSubmit={handleAfterSubmit} handleCloseModule={handleCloseModule}/> 
      : module === 'edit' ? <EditAuthor handleAfterSubmit={handleAfterSubmit} handleCloseModule={handleCloseModule} editedID={editedID}/> 
      : module === 'view' ? <ViewAuthor handleCloseModule={handleCloseModule} editedID={editedID}/> 
      : ''}
    </>
  )
}

export default Author
