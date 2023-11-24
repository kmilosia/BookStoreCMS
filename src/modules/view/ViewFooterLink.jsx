import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
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
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
                <h1 className='module-header'>{link.name}</h1>
                <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col'>
                <p className='column-info-title'>Nazwa</p>
                <h2 className='column-info-text'>{link.name}</h2>
            </div>
            <div className='flex flex-col'>
                <p className='column-info-title'>Pozycja</p>
                <h2 className='column-info-text'>{link.position}</h2>
            </div>
            <div className='flex flex-col'>
                <p className='column-info-title'>Kolumna</p>
                <h2 className='column-info-text'>{link.columnName}</h2>
            </div>
            </div>
            <div className='divider' />
            <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col'>
                <p className='column-info-title'>HTML Obiekt</p>
                <h2 className='column-info-text'>{link.htmlObject}</h2>
            </div>
            <div className='flex flex-col'>
                <p className='column-info-title'>Ścieżka</p>
                <h2 className='column-info-text'>{link.path}</h2>
            </div>
            <div className='flex flex-col'>
                <p className='column-info-title'>URL</p>
                <h2 className='column-info-text'>{link.url}</h2>
            </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ViewFooterLink
