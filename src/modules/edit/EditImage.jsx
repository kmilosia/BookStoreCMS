import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { FiPlus } from 'react-icons/fi'
import DefaultInput from '../../components/forms/DefaultInput'

function EditImage(props) {
    const [title, setTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [image,setImage] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Images/${id}`)
          setImage(response.data)
          setTitle(response.data.title)
          setImageURL(response.data.imageURL)
        }catch(err){
          console.error(err)
        }
    }
    const handleURLInput = (e) => {
        setImageURL(e.target.value)
    }
    const handleTitleInput = (e) => {
      setTitle(e.target.value)
  }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleAcceptButton = () => {
        image.imageURL = imageURL
        props.putData(image.id, image)
        props.setEditedID(null)
        props.setShowEditModule(false)
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj zdjęcie</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <img src={imageURL} className='w-full object-contain h-auto my-1' />
            <div className='flex flex-row items-center'>
              <div className='grid grid-cols-[1fr_2fr] gap-2 mt-2'>
              <DefaultInput onChange={handleTitleInput} value={title} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
              <DefaultInput onChange={handleURLInput} value={imageURL} type='text' placeholder='Adres URL' title='Adres URL zdjęcia'/>
              </div>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default EditImage
