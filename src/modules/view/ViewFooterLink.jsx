import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewFooterLink(props) {
    const [link, setLink] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/FooterLinks/full-columns/${id}`)
          setLink(response.data)
        }catch(err){
          console.error(err)
        }
    }
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        getItem(props.editedID)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Informacje o linku stopki</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Nazwa:</p>
                    <h2 className='mx-2'>{link.name}</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Pozycja:</p>
                    <h2 className='mx-2'>{link.position}</h2>
                </div>   
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Ścieżka:</p>
                    <h2 className='mx-2'>{link.path}</h2>
                </div> 
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>URL:</p>
                    <h2 className='mx-2'>{link.url}</h2>
                </div> 
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Kolumna:</p>
                    <h2 className='mx-2'>{link.columnName}</h2>
                </div> 
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Obiekt HTML:</p>
                    <h2 className='mx-2'>{link.htmlObject}</h2>
                </div>                         
            </div>
        </div>
    </div>
  )
}

export default ViewFooterLink
