import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewCategoryElement(props) {
    const [element, setElement] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/CategoryElements/${id}`)
          if(response.status === 200 || response.status === 204){
          setElement(response.data)
          }
        }catch(err){
          console.log(err)
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
                    <h1 className='module-header'>{element.imageTitle}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-3 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł</p>
                    <h2 className='column-info-text'>{element?.imageTitle}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Pozycja</p>
                    <h2 className='column-info-text'>{element?.position}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Ścieżka</p>
                    <h2 className='column-info-text'>{element?.path}</h2>
                </div>
                <div className='flex flex-col col-span-3'>
                    <p className='column-info-title'>Treść</p>
                    <h2 className='column-info-text'>{element?.content}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Logo</p>
                    <img className='w-full h-auto object-contain p-5' src={element.logo}/>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>URL zdjęcia</p>
                    <img className='w-full h-auto object-contain' src={element.imageURL}/>
                </div>
              
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewCategoryElement
