import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import DefaultInput from '../../components/forms/DefaultInput'

function NewImage({setShowNewModule, postData}) {
    const [title, setTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [displayImg, setDisplayImg] = useState(false)
    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }
    const handleURLInput = (e) => {
        setImageURL(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAddPhoto = () => {
        setDisplayImg(true)
    }
    const handleAcceptButton = () => {
        const data = {
            title: title,
            imageURL: imageURL
        }
        postData(data)
        handleCloseModule()
    } 
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowe zdjęcie</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                {displayImg && <img src={imageURL} className='w-full object-contain h-auto my-1' />}
                <div className='flex flex-row items-center'>
                  <div className='grid grid-cols-[1fr_2fr] gap-2'>
                    <DefaultInput onChange={handleTitleInput} value={title} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                    <DefaultInput onChange={handleURLInput} value={imageURL} type='text' placeholder='Adres URL' title='Adres URL zdjęcia'/>
                  </div>
                  <button className='module-round-button mt-4' onClick={handleAddPhoto}><FiPlus/></button>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewImage
