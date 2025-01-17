import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { newsletterValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import { convertDate } from '../../utils/functions/convertDate'

function NewNewsletter({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        title: '',
        publicationDate: '',
        content: '',
        isSent: false,
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(newsletterValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            const convertedDate = convertDate(values.publicationDate)
            setValues(prevValues => ({
                ...prevValues,
                publicationDate: convertedDate,
              }))     
            postData(values)
            handleCloseModule()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy newsletter</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="title" error={errors.title} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł newslettera'/>
                    <DefaultInput name="publicationDate" error={errors.publicationDate} onChange={handleChange} type='date' placeholder='Data publikacji' title='Data publikacji'/>
                </div>
                <DefaultTextarea name="content" error={errors.content} onChange={handleChange} placeholder='Treść' title="Treść newslettera"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewNewsletter
