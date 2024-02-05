import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { imageValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'

function NewImage({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        title: '',
        position: '',
        imageURL: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(imageValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(values)
            handleCloseModule()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowe zdjęcie</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="position" error={errors.position} onChange={handleChange} type='number' placeholder='Pozycja (1 to zdjęcie główne książki)' title='Pozycja'/>
                    <DefaultInput name="title" error={errors.title} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <DefaultInput name="imageURL" error={errors.imageURL} onChange={handleChange} type='text' placeholder='Adres zdjęcia' title='Adres zdjęcia'/>
                </div>
                {values.imageURL &&
                <div className='w-full h-auto'>
                    <img src={values.imageURL} className='w-1/3 h-auto object-contain' />
                </div>
                }
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewImage
