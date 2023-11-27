import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { showAlert } from '../../store/alertSlice'
import { dictionaryValidate } from '../../utils/validation/newValidate'

function NewDictionaryRecord({setShowNewModule,postData,title}) {
    const [nameValue, setNameValue] = useState('')
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const handleValueChange = (e) => {
        setNameValue(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(dictionaryValidate(nameValue))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(nameValue)
            handleCloseModule()
            dispatch(showAlert({ title: 'Nowy rekord słownikowy został dodany!' }));
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Dodaj {title}</h1>
                <DefaultInput error={errors.nameValue} name="nameValue" onChange={handleValueChange} type='text' placeholder='Nazwa' title='Nazwa'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDictionaryRecord
