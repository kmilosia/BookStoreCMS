import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'

function EditBanner(props) {
    const [banner,setBanner] = useState({})
    const handleChange = (e) => {
      setBanner((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        props.putData(banner.id, banner)
        handleCloseModule()
      }
  useEffect(()=> {
    props.getItem(props.editedID,setBanner)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj baner</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleChange} name='title' value={banner.title} type='text' placeholder='Tytuł' title='Tytuł baneru'/>
                    <DefaultInput onChange={handleChange} name='path' value={banner.path} type='text' placeholder='Ścieżka' title='Ścieżka baneru'/>
                    <DefaultInput onChange={handleChange} name='imageTitle' value={banner.imageTitle} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia'/>
                    <DefaultInput onChange={handleChange} name='imageURL' value={banner.imageURL} type='text' placeholder='Adres zdjęcia' title='Adres URL zdjęcia'/>
                </div>
                {banner.imageURL &&
                <div className='w-full h-auto'>
                    <img src={banner.imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditBanner
