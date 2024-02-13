import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useEffect } from 'react'
import { employeeValidate } from '../../utils/validation/newValidate'

function NewEmployee({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phoneNumber: '',
        isSubscribed: false,
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(employeeValidate(values))
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
                  <h1 className='module-header'>Dodaj nowego pracownika</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Imię' title='Imię pracownika'/>
                    <DefaultInput name="surname" error={errors.surname} onChange={handleChange} type='text' placeholder='Nazwisko' title='Nazwisko pracownika'/>
                    <DefaultInput name="username" error={errors.username} onChange={handleChange} type='text' placeholder='Nazwa użytkownika' title='Nazwa użytkownika'/>
                    <DefaultInput name="email" error={errors.email} onChange={handleChange} type='text' placeholder='Email' title='Email'/>
                    <DefaultInput name="phoneNumber" error={errors.phoneNumber} onChange={handleChange} type='text' placeholder='Numer telefonu' title='Numer telefonu'/>
                    <DefaultInput name="password" error={errors.password} onChange={handleChange} type='text' placeholder='Hasło' title='Hasło'/>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewEmployee
