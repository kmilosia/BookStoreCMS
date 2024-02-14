import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import Spinner from '../../components/Spinner'
import RoleCheckboxes from '../../components/forms/RoleCheckboxes'
import { getValidToken } from '../../api/getValidToken'

function EditRoleClaims(props) {
  const [loading, setLoading] = useState(true)
  const [claims, setClaims] = useState(null)
  const [claimPosts, setClaimPosts] = useState(null)
  const [claimValues, setClaimValues] = useState(null)
    const getRoleClaims = async (name) => {
      try{
        const token = getValidToken()
        if(token){    
          const response = await axiosClient.get(`/Admin/Roles/Claims?roleName=${name}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setClaimPosts(response.data.claimPost)
          }}
      }catch(err){
        console.log(err);
      }
      setLoading(false)
    }
    const getClaimValues = async () => {
      try{
        const token = getValidToken()
        if(token){    
          const response = await axiosClient.get(`/Admin/ClaimValues`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setClaimValues(response.data)
          }}
      }catch(err){
        console.log(err);
      }
    }
    const getClaims = async () => {
      try{
        const token = getValidToken()
        if(token){    
          const response = await axiosClient.get(`/Admin/Claims`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setClaims(response.data)
          }}
      }catch(err){
        console.log(err);
      }
      setLoading(false)
    }
    const handleCloseModule = () => {
      props.setEditedName(null)
      props.setShowEditModule(false)
    }
    const handleCheck = (name, value) => {
      let updatedClaimPosts = [...claimPosts]
      const existingClaimIndex = updatedClaimPosts.findIndex((claimPost) => claimPost.claimName === name)
      if (existingClaimIndex !== -1) {
        const existingClaim = updatedClaimPosts[existingClaimIndex]
        const updatedClaimValues = existingClaim.claimValues.includes(value) ? existingClaim.claimValues.filter((item) => item !== value) : [...existingClaim.claimValues, value]
        updatedClaimPosts[existingClaimIndex] = { ...existingClaim, claimValues: updatedClaimValues }
      } else {
        updatedClaimPosts = [...updatedClaimPosts,{
            claimName: name,
            claimValues: [value]
          }
        ]
      }
      setClaimPosts(updatedClaimPosts)
    }
  const handleAcceptButton = () => {
    const data = {
      roleName: props.editedName,
      claimPost: claimPosts
    }
    props.postData(data)
    handleCloseModule()
  } 
  useEffect(() => {
    getClaimValues()
    getClaims()
    getRoleClaims(props.editedName)
  }, [])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window w-5/6 dark:text-white'>
        {loading ? <Spinner /> :
          <div className='module-content-wrapper'>
            <div className='module-header-row'>
              <h1 className='module-header'>Zmień uprawnienia dostępu dla roli {props.editedName}</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div> 
            <div className='grid grid-cols-5 gap-1 rounded-md dark:bg-dracula-800 dark:text-dracula-400 items-center bg-dracula-150 text-dracula-500 px-6 py-4 cursor-default'>
              <p></p>
              {claimValues?.map((item,index) => {
                    return(
                      <p className='text-center' key={index}>{item.name}</p>
                    )
                  })}
            </div>
            {claimPosts && claims?.map((item,index) => {
              return(
                <RoleCheckboxes key={index} name={item.name} claimPosts={claimPosts} handleCheck={handleCheck} />          
              )
            })}
            <button onClick={handleAcceptButton} className='module-button mt-3'>Zapisz zmiany</button>
          </div>
        }
        </div>
    </div>
  )
}

export default EditRoleClaims
