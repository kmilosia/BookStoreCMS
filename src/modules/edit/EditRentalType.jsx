import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { rentalTypeValidate } from '../../utils/validation/newValidate'

function EditRentalType(props) {
    const [submitting, setSubmitting] = useState(false)
    const [errors,setErrors] = useState({})
    const [values,setValues] = useState({
      name: '',
      days: '',
      price: '',
    })
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
  }
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
      setErrors(rentalTypeValidate(values))
    } 
  useEffect(()=> {
    props.getItem(props.editedID,setValues)
  },[])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj typ wypożyczenia</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput error={errors.name} value={values.name} name='name' onChange={handleChange} type='text' placeholder='Nazwa' title='Nazwa'/>
                <DefaultInput error={errors.days} value={values.days} name='days' onChange={handleChange} type='number' placeholder='Liczba dni' title='Dni wypożyczenia'/>
                <DefaultInput error={errors.price} value={values.price} name='price' onChange={handleChange} type='number' placeholder='Cena' title='Cena wypożyczenia'/>
                <button onClick={handleSubmit} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditRentalType
