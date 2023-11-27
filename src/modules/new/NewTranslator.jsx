import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { personValidate } from '../../utils/validation/newValidate'
import { showAlert } from '../../store/alertSlice'

function NewTranslator({setShowNewModule, postData}) {
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        name: '',
        surname: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(personValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(values)
            handleCloseModule()
            dispatch(showAlert({ title: 'Nowy translator został dodany!' }));
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nowego translatora</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultInput error={errors.name} name="name" onChange={handleChange} type='text' placeholder='Imię' title='Imię translatora' />
                <DefaultInput error={errors.surname} name="surname" onChange={handleChange} type='text' placeholder='Nazwisko' title='Nazwisko translatora' />
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewTranslator
