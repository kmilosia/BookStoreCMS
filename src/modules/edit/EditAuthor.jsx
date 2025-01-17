import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { personValidate } from '../../utils/validation/newValidate'

function EditAuthor({handleAfterSubmit,handleCloseModule,editedID,putData, getItem}) {
    const [author,setAuthor] = useState({})
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const handleChange = (e) => {
      setAuthor((prevAuthor) => {
        return { ...prevAuthor, [e.target.name]: e.target.value }
      })
    }
    const handleSaveClick = () => {
      setErrors(personValidate(author))
      setSubmitting(true)
    }
    useEffect(()=> {
      getItem(editedID, setAuthor)
    },[])
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        putData(author)
        handleAfterSubmit()
      }
    }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj autora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput error={errors.name} name="name" onChange={handleChange} value={author?.name} type='text' placeholder='Imię' title='Imię autora'/>
                    <DefaultInput error={errors.surname} name="surname" onChange={handleChange} value={author?.surname} type='text' placeholder='Nazwisko' title='Nazwisko autora'/>
                </div>
                <DefaultTextarea error={errors.description} name="description" onChange={handleChange} value={author?.description} placeholder='Opis' title="Opis autora"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditAuthor
