import React from 'react'
import AddNewButton from '../../components/buttons/AddNewButton'
import { useState } from 'react'
import { useEffect } from 'react'
import ListHeader from '../../components/ListHeader'
import { rolesColumns } from '../../utils/column-names'
import { BsTrash3Fill } from 'react-icons/bs'
import axiosClient from '../../api/apiClient'
import Spinner from '../../components/Spinner'
import { useMessageStore } from '../../store/messageStore'
import NewRoles from '../../modules/new/NewRoles'
import { getValidToken } from '../../api/getValidToken'

function Roles() {
    const [data, setData] = useState([])
    const [showNewModule, setShowNewModule] = useState(false)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const setMessage = useMessageStore((state) => state.setMessage)
    const getAllData = async () => {
      try{
        setIsDataLoading(true)
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.get(`/Admin/Roles`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }else{
            setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
          }}
          setIsDataLoading(false)
      }catch(err){
        setIsDataLoading(false)
        setMessage({title: "Błąd przy pobieraniu danych", type: 'error'})
      }
    }
    const deleteData = async (name) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.delete(`/Admin/Roles/${name}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Rola została usunięta", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas usuwania roli", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas usuwania roli", type: 'error'})
      }
    }
  const postData = async (data) => {
      try{
        const token = getValidToken()
        if(token){  
          const response = await axiosClient.post(`/Admin/Roles?roleName=${data}`,null ,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setMessage({title: "Rola została dodana", type: 'success'})
            getAllData()
          }else{
            setMessage({title: "Błąd podczas dodawania roli", type: 'error'})
          }}
        }catch(e){
          setMessage({title: "Błąd podczas dodawania roli", type: 'error'})
      }
    }
    const handleDeleteClick = (item) => {
        deleteData(item)
      }
    useEffect(()=>{
        getAllData()
    },[])
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='flex flex-col'>
        <h1 className='main-header'>Role</h1>    
        <div className='filter-panel'>
          <AddNewButton setShowNewModule={setShowNewModule} title="Rolę"/>                   
        </div>
        <ListHeader columnNames={rolesColumns}/>
      </div>
      {isDataLoading ? 
      <Spinner />
      :
      <div className='main-list-wrapper'>
      {data.map(item => (             
            <div key={item.id} className='table-row-wrapper grid-cols-2'>
                <p className='px-2'>{item}</p>
                <div className='flex justify-end'>
                  <button onClick={() => handleDeleteClick(item)} className='table-button'><BsTrash3Fill /></button>
                </div>             
            </div>        
        ))}
      </div>
    }
    </div>
    {showNewModule && <NewRoles postData={postData} setShowNewModule={setShowNewModule}/>}
    </>
  )
}

export default Roles
