import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { employeeColumns } from '../../utils/column-names'
import { employeeSortOptions } from '../../utils/select-options'
import Spinner from '../../components/Spinner'
import ListHeader from '../../components/ListHeader'
import Searchbar from '../../components/Searchbar'
import SortBar from '../../components/SortBar'
import axiosClient from '../../api/apiClient'
import { sortItems } from '../../utils/sort'
import { useMessageStore } from '../../store/messageStore'
import EditRoleClaims from '../../modules/edit/EditRoleClaims'

function RoleClaims() {
    const [data, setData] = useState([])
    const [editedName, setEditedName] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showEditModule, setShowEditModule] = useState(false)
    const [isAscending, setIsAscending] = useState(true)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const filterItems = (list, value) => list.filter((item) => {
        if (!value) {
            return true;
        }
        const itemName = item.roleName.toLowerCase()
        return itemName.includes(value.toLowerCase())
    })
    const sortedItems = sortItems(data, selectedOption, isAscending)
    const filteredItems = filterItems(sortedItems, searchValue)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Admin/Roles/Claims`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }
          setIsDataLoading(false)
      }catch(err){
        setIsDataLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
          const response = await axiosClient.post(`/Admin/Roles/Claims`, data)
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Uprawnienia zostały zmienione", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas zmiany uprawnień", type: 'error'})
          }
        }catch(e){
          setMessage({title: "Błąd podczas zmiany uprawnień", type: 'error'})
      }
    }
    const handleEditClick = (item) => {
        setEditedName(item)
        setShowEditModule(true)
     }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Uprawnienia dostępu</h1>    
        <div className='filter-panel'>
          <SortBar options={employeeSortOptions} setSelectedOption={setSelectedOption} selectedOption={selectedOption} isAscending={isAscending} setIsAscending={setIsAscending}/>
          <Searchbar setSearchValue={setSearchValue} searchValue={searchValue}/>         
        </div>
        <ListHeader columnNames={employeeColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {filteredItems.map((item,index) => (             
            <div key={index} className='table-row-wrapper grid-cols-3'>
                <p className='px-2'>{item.roleName}</p>      
                <div className='flex flex-col'>
                    {item.claimPost?.map((claim,index) => {
                        return(
                            <p key={index}>
                                <strong>{claim.claimName}</strong> : 
                                {claim.claimValues?.map((value) => {
                                    return(
                                        value
                                    )
                                })}
                            </p>
                        )
                    })}
                </div>                 
                <div className='flex justify-end'>
                    <button onClick={() => handleEditClick(item.roleName)} className='table-button'><AiFillEdit /></button>
                </div>             
            </div>        
        ))}
      </div>
    }
    </div>
    {showEditModule && <EditRoleClaims postData={postData} editedName={editedName} setEditedName={setEditedName} setShowEditModule={setShowEditModule}/>}
    </>
  )
}

export default RoleClaims
