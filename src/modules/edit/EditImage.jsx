import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function EditImage(props) {
    const [imageURL, setImageURL] = useState('')
    const [source, setSource] = useState('')
    const [image,setImage] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Images/${id}`)
          setImage(response.data)
          setImageURL(response.data.imageURL)
          setSource(response.data.imageURL)
        }catch(err){
          console.error(err)
        }
    }
    const handleURLInput = (e) => {
        setImageURL(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleAddButton = () => {
        setSource(imageURL)
    }
    const handleSaveClick = () => {
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
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Edytuj zdjęcie</h1>
                <img src={source} className='w-full object-contain h-auto my-1' />
                <input onChange={handleURLInput} type='text' value={imageURL} className='module-input-text'/>
                <button onClick={handleAddButton} className='module-button'>Dodaj zdjęcie</button>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditImage
