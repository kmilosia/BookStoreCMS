import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { personValidate } from '../../utils/validation/newValidate'

function EditTranslator(props) {
    const [values,setValues] = useState({
      name: '',
      surname: ''
    })
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const finishSubmit = () => {
        props.putData(props.editedID, values)
        handleCloseModule()
    }
    const handleSubmit = () => {
      setSubmitting(true)
      setErrors(personValidate(values))
  } 
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])
  useEffect(()=> {
    props.getItem(props.editedID,setValues)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj translatora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput error={errors.name} value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} type='text' placeholder='Imię' title='Imię translatora' />
                <DefaultInput error={errors.surname} value={values.surname} onChange={(e) => setValues({...values, surname: e.target.value})} type='text' placeholder='Nazwisko' title='Nazwisko translatora' />
                <button onClick={handleSubmit} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditTranslator
