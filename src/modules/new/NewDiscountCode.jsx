import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { discountCodeValidate } from '../../utils/validation/newValidate'
import { convertDate } from '../../utils/functions/convertDate'

function NewDiscountCode({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values, setValues] = useState({
      code: '',
      description: '',
      percent: '',
      startingDate: '',
      expiryDate: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }    
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(discountCodeValidate(values))
      } 
      const finishSubmit = () => {
        const newExpiryDate = convertDate(values.expiryDate)
        const newStartingDate = convertDate(values.startingDate)
        const data = {
          code: values.code,
          description: values.description,
          percentOfDiscount: values.percent,
          expiryDate: newExpiryDate,
          startingDate: newStartingDate
        }
          postData(data)
          handleCloseModule()
        }
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
                  <h1 className='module-header'>Dodaj nowy kod rabatowy</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput name="code" error={errors.code} onChange={handleChange} type='text' placeholder='Kod' title="Kod rabatu"/>
                <DefaultInput name="percent" error={errors.percent} onChange={handleChange} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="startingDate" error={errors.startingDate} onChange={handleChange} type='date' title="Data rozpoczęcia"/>
                <DefaultInput name="expiryDate" error={errors.expiryDate} onChange={handleChange} type='date' title="Data zakończenia"/>
                </div>
                <DefaultTextarea name="description" error={errors.description} onChange={handleChange} placeholder='Opis' title="Opis kodu"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscountCode
