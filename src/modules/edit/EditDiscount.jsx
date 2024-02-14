import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { convertDate, convertDateToInput } from '../../utils/functions/convertDate'
import { discountValidate } from '../../utils/validation/newValidate'
import { getBookItems } from '../../api/selectAPI'
import { getValidToken } from '../../api/getValidToken'

function EditDiscount({setShowEditModule, putData, editedID}) {
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [bookItemOptions, setBookItemOptions] = useState([])
  const [discount, setDiscount] = useState({
    title: '',
    description: '',
    percent: '',
    expiryDate: '',
    startingDate: '',
    selectedBooks: [],
  })
    const getItem = async (id) => {
      try{
        const token = getValidToken()
        if(token){    
        const response = await axiosClient.get(`/Discount/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
        }})
        if(response.status === 200 || response.status === 204){
          const newData = response.data
          const newStartDate = new Date(response.data.startingDate)
          const newExpiryDate = new Date(response.data.expiryDate)
          setDiscount({
            percent: newData.percentOfDiscount,
            title: newData.title,
            description: newData.description,
            expiryDate: convertDateToInput(newExpiryDate),
            startingDate: convertDateToInput(newStartDate),
            selectedBooks: newData.listOfBookItems.map(item => ({ value: item.id, label: item.bookTitle })),
          })
        }}
      }catch(err){
        console.log(err)
      }
    }
    const handleChange = (e) => {
      setDiscount({ ...discount, [e.target.name]: e.target.value })
    }
    const handleBooksChange = (selected) => {
      setDiscount(prev => ({ ...prev, selectedBooks:selected }))
    }
    const handleCloseModule = () => {
        setShowEditModule(false)
    }   
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(discountValidate(discount))
    } 
    const finishSubmit = () => {
        const bookItemsList = discount.selectedBooks.map(item => (
            {
                id: item.value
            }
        ))
        const data = {
            title: discount.title,
            description: discount.description,
            percentOfDiscount: Number(discount.percent),
            expiryDate: convertDate(discount.expiryDate),
            startingDate: convertDate(discount.startingDate),
            listOfBookItems: bookItemsList,
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
      getBookItems(setBookItemOptions)
      getItem(editedID)
    },[])

  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj promocję</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput error={errors.title} name="title" value={discount.title} onChange={handleChange} type='text' placeholder='Tytuł' title="Tytuł promocji"/>
                <DefaultInput error={errors.percent} name="percent" value={discount.percent} onChange={handleChange} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <DefaultTextarea error={errors.description} name="description" value={discount.description} onChange={handleChange} placeholder='Opis' title="Opis promocji"/>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput error={errors.startingDate} name="startingDate" onChange={handleChange} value={discount.startingDate} type='date' title='Data rozpoczęcia'/>
                <DefaultInput error={errors.expiryDate} name="expiryDate" onChange={handleChange} value={discount.expiryDate} type='date' title="Data zakończenia"/>
                </div>
                <DefaultSelect error={errors.selectedBooks} name="selectedBooks" onChange={handleBooksChange} value={discount.selectedBooks} options={bookItemOptions} isMulti={true} title="Wszystkie egzemplarze objęte promocją" placeholder='Egzemplarze książek'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscount
