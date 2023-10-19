import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewImage(props) {
    const [image, setImage] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Images/${id}`)
          setImage(response.data)
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
            <div className='module-content-wrapper '>
            <div className='module-header-row'>
                    <h1 className='module-header'>{image.title}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>               
                 <div className='my-2 flex items-center justify-center'>
                    <img src={image.imageURL} alt='Zdjęcie' className='w-full object-contain h-auto'/>
                </div>
                <div className='divider'/>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Tytuł</p>
                    <h2 className='column-info-text'>{image.title}</h2>
                </div>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Opis</p>
                    <h2 className='column-info-text break-all'>{image.imageURL}</h2>
                </div>                        
            </div>
        </div>
    </div>
  )
}

export default ViewImage
