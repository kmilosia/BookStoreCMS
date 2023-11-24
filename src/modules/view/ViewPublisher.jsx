import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewPublisher(props) {
    const [publisher, setPublisher] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Publisher/${id}`)
          setPublisher(response.data)
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
                    <h1 className='module-header'>{publisher.name}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>  
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Nazwa</p>
                    <h2 className='column-info-text'>{publisher.name}</h2>
                </div>             
                <div className='divider'></div>           
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Opis</p>
                    <h2 className='column-info-text'>{publisher.description}</h2>
                </div>              
            </div>
        </div>
    </div>
  )
}

export default ViewPublisher
