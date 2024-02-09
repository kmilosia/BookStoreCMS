import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import {convertDate}  from '../../utils/functions/convertDate'
import { useEffect } from 'react'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { discountValidate } from '../../utils/validation/newValidate'
import { getBookItems, getFormBookItems } from '../../api/selectAPI'

function NewDiscount({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [bookOptions, setBookOptions] = useState([])
    const [values, setValues] = useState({
      title: '',
      description: '',
      percent: '',
      expirationDate: '',
      startingDate: '',
      selectedBooks: [],
    })
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleBooks = (selectedBooks) => {
        setValues({ ...values, selectedBooks })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(discountValidate(values))
      } 
      const finishSubmit = () => {
        const convertedExpDate = convertDate(values.expirationDate)
        const convertedStartDate = convertDate(values.startingDate)
        const data = {
          title: values.title,
          description: values.description,
          percentOfDiscount: Number(values.percent),
          expiryDate: convertedExpDate,
          startingDate: convertedStartDate,
          listOfBookItems: values.selectedBooks.map((item) => ({
            id: item.value,
          })),
          }     
          postData(data)
          handleCloseModule()
        }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
    useEffect(() => {
        getFormBookItems(setBookOptions)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nową promocję</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput name="title" error={errors.title} onChange={handleChange} type='text' placeholder='Tytuł' title="Tytuł promocji"/>
                <DefaultInput name="percent" error={errors.percent} onChange={handleChange} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <DefaultTextarea name="description" error={errors.description} onChange={handleChange} placeholder='Opis' title="Opis promocji"/>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="startingDate" onChange={handleChange} value={values.startingDate} type='date' title='Data rozpoczęcia'/>
                <DefaultInput name="expirationDate" onChange={handleChange} value={values.expirationDate} type='date' title="Termin ważności"/>
                </div>
                <DefaultSelect name="selectedBooks" error={errors.selectedBooks} onChange={handleBooks} value={values.selectedBooks} options={bookOptions} isMulti={true} title="Egzemplarze objęte promocją" placeholder='Dodaj egzemplarz do promocji'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscount
