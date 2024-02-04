import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { convertDate, convertDateToInput } from '../../utils/functions/convertDate'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { discountCodeValidate } from '../../utils/validation/newValidate'

function EditDiscountCode({setShowEditModule, putData, editedID}) {
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [discount, setDiscount] = useState({
    code: '',
    description: '',
    percent: '',
    expiryDate: '',
    startingDate: '',
  })
    const getItem = async (id) => {
      try{
        const response = await axiosClient.get(`/DiscountCodes/${id}`)
        if(response.status === 200 || response.status === 204){
          const newData = response.data
          const newStartDate = new Date(response.data.startingDate)
          const newExpiryDate = new Date(response.data.expiryDate)
          setDiscount({
            percent: newData.percentOfDiscount,
            code: newData.code,
            description: newData.description,
            expiryDate: convertDateToInput(newExpiryDate),
            startingDate: convertDateToInput(newStartDate),
          })
        }
      }catch(err){
        console.log(err)
      }
    }
    const handleChange = (e) => {
      setDiscount({ ...discount, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
        setShowEditModule(false)
    }   
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(discountCodeValidate(discount))
    } 
    const finishSubmit = () => {
        const data = {
            code: discount.code,
            description: discount.description,
            percentOfDiscount: Number(discount.percent),
            expiryDate: convertDate(discount.expiryDate),
            startingDate: convertDate(discount.startingDate),
        }
        putData(editedID,data)
        handleCloseModule()
    } 
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
      }
    }, [errors])
    useEffect(() => {
      getItem(editedID)
    },[])

  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj kod rabatowy</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput error={errors.code} name="code" value={discount.code} onChange={handleChange} type='text' placeholder='Kod' title="Kod rabatu"/>
                <DefaultInput error={errors.percent} name="percent" value={discount.percent} onChange={handleChange} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput error={errors.startingDate} name="startingDate" onChange={handleChange} value={discount.startingDate} type='date' title='Data rozpoczęcia'/>
                <DefaultInput error={errors.expiryDate} name="expiryDate" onChange={handleChange} value={discount.expiryDate} type='date' title="Data zakończenia"/>
                </div>
                <DefaultTextarea error={errors.description} name="description" value={discount.description} onChange={handleChange} placeholder='Opis' title="Opis kodu"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscountCode
