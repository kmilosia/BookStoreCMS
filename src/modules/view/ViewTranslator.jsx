import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewTranslator(props) {
    const [translator, setTranslator] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Translator/${id}`)
          setTranslator(response.data)
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
                <h1 className='module-header'>Informacje o translatorze</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Imię:</p>
                    <h2 className='mx-2'>{translator.name}</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Nazwisko:</p>
                    <h2 className='mx-2'>{translator.surname}</h2>
                </div>               
            </div>
        </div>
    </div>
  )
}

export default ViewTranslator
