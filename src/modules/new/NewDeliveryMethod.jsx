import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { showAlert } from '../../store/alertSlice'
import { useDispatch } from 'react-redux'
import { namePriceValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'

function NewDeliveryMethod({setShowNewModule,postData}) {
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        name: '',
        price: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(namePriceValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(values)
            handleCloseModule()
            dispatch(showAlert({ title: 'Nowa forma dostawy została dodana!' }));
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Dodaj nową formę dostawy</h1>
                <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Nazwa' title='Nazwa'/>
                <DefaultInput name="price" error={errors.price} onChange={handleChange} type='number' placeholder='Cena' title='Cena dostawy'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDeliveryMethod
