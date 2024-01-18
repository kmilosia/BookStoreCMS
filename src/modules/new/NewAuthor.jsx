import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { personValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import { showAlert } from '../../store/alertSlice'
import { useDispatch } from 'react-redux'
import { addAuthor } from '../../api/authorAPI'
import ButtonSpinner from '../../components/ButtonSpinner'

function NewAuthor({handleAfterSubmit,handleCloseModule}) {
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [values,setValues] = useState({
        name: '',
        surname: '',
        description: ''
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(personValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            addAuthor(values, setSubmitLoading)
            dispatch(showAlert({ title: 'Nowy autor został dodany!' }))
            handleAfterSubmit()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowego autora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Imię' title='Imię autora'/>
                    <DefaultInput name="surname" error={errors.surname} onChange={handleChange} type='text' placeholder='Nazwisko' title='Nazwisko autora'/>
                </div>
                <DefaultTextarea name="description" onChange={handleChange} placeholder='Opis' title="Opis autora"/>
                <button onClick={handleAcceptButton} className='module-button'>{submitLoading ? <ButtonSpinner /> : 'Akceptuj'}</button>
            </div>
        </div>
    </div>
  )
}

export default NewAuthor
