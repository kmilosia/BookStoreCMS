import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { newsValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import { useMessageStore } from '../../store/messageStore'

function NewNews({setShowNewModule, postData}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        topic: '',
        authorName: '',
        content: '',
        imageTitle: '',
        imageURL: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(newsValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            console.log(values);
            postData(values)
            handleCloseModule()
            setMessage({title: "Wiadomość została dodana", type: 'success'})
        }
      }, [errors])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nową wiadomość</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="topic" error={errors.topic} onChange={handleChange} type='text' placeholder='Temat' title='Temat wiadomości'/>
                    <DefaultInput name="authorName" error={errors.authorName} onChange={handleChange} type='text' placeholder='Autor' title='Autor wiadomości'/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="imageTitle" error={errors.imageTitle} onChange={handleChange} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia'/>
                    <DefaultInput name="imageURL" error={errors.imageURL} onChange={handleChange} type='text' placeholder='Adres zdjęcia' title='Adres zdjęcia'/>
                </div>
                {values.imageURL &&
                <div className='w-full h-auto my-2'>
                    <img src={values.imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <DefaultTextarea name="content" onChange={handleChange} placeholder='Treść' title="Treść wiadomości"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewNews
