import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'

function ViewNewsletter(props) {
    const [newsletter, setNewsletter] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Newsletter/${id}`)
          setNewsletter(response.data)
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
                    <h1 className='module-header'>{newsletter.title}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł</p>
                    <h2 className='column-info-text'>{newsletter.title}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Data publikacji</p>
                    <h2 className='column-info-text'>{formatDisplayDate(newsletter.publicationDate)}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Treść</p>
                    <h2 className='column-info-text'>{newsletter.content}</h2>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewNewsletter
