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
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Informacje o zdjęciu</h1>
                <div className='my-1 flex items-center justify-center'>
                    <img src={image.imageURL} alt='Zdjęcie' className='w-full object-contain h-auto'/>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>URL:</p>
                    <h2 className='mx-2 break-all'>{image.imageURL}</h2>
                </div>                        
            </div>
        </div>
    </div>
  )
}

export default ViewImage
