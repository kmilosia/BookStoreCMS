import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { rolesColumns } from '../../utils/column-names'
import Spinner from '../../components/Spinner'
import ListHeader from '../../components/ListHeader'
import axiosClient from '../../api/apiClient'
import { useMessageStore } from '../../store/messageStore'
import EditRoleClaims from '../../modules/edit/EditRoleClaims'

function RoleClaims() {
    const [data, setData] = useState([])
    const [editedName, setEditedName] = useState(null)
    const [showEditModule, setShowEditModule] = useState(false)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getRoles = async () => {
      try{
        setIsDataLoading(true)
          const response = await axiosClient.get(`/Admin/Roles`)
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
        getRoles()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header mb-4'>Uprawnienia dostępu</h1>    
        <ListHeader columnNames={rolesColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {data.map((item,index) => (             
            <div key={index} className='table-row-wrapper grid-cols-2'>
                <p className='px-2'>{item}</p>                 
                <div className='flex justify-end'>
                    <button onClick={() => handleEditClick(item)} className='table-button'><AiFillEdit /></button>
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
