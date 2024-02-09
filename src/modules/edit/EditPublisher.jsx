import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { publisherValidate } from '../../utils/validation/newValidate'

function EditPublisher(props) {
  const [values,setValues] = useState({
    name: '',
    description: ''
  })
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const finishSubmit = () => {
      props.putData(props.editedID, values)
      props.setEditedID(null)
      props.setShowEditModule(false)
  }
  const handleSubmit = () => {
    setSubmitting(true)
    setErrors(publisherValidate(values))
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
                  <h1 className='module-header'>Edytuj wydawnictwo</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput error={errors.name} value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} type='text' placeholder='Nazwa' title='Nazwa wydawnictwa'/>
                <DefaultTextarea error={errors.description} value={values.description} onChange={(e) => setValues({...values, description: e.target.value})} placeholder='Opis' title='Opis wydawnictwa'/>
                <button onClick={handleSubmit} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditPublisher
