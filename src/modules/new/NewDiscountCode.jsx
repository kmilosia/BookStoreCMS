import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import {convertDate}  from '../../utils/functions/convertDate'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { discountCodeValidate } from '../../utils/validation/newValidate'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../store/alertSlice'

function NewDiscountCode({setShowNewModule, postData}) {
    const today = new Date().toISOString().split('T')[0];
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [bookOptions, setBookOptions] = useState([])
    const [values, setValues] = useState({
      code: '',
      description: '',
      percent: '',
      expirationDate: today,
      startingDate: today,
      selectedBooks: [],
    })
    const getBooks = async () => {
        try{
          const response = await axiosClient.get(`/BookItems`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.bookTitle
          }))
          setBookOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    const handleBooks = (selectedBooks) => {
        setValues({ ...values, selectedBooks });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }    
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(discountCodeValidate(values))
      } 
      const finishSubmit = () => {
        const convertedExpDate = convertDate(values.expirationDate)
        const convertedStartDate = convertDate(values.startingDate)
        const data = {
          code: values.code,
          description: values.description,
          percentOfDiscount: values.percent,
          expiryDate: convertedExpDate,
          startingDate: convertedStartDate,
          listOfBookItems: values.booksList.map((item) => ({
            id: item.value,
          })),
        };     
          console.log(data)
          postData(data)
          handleCloseModule()
          dispatch(showAlert({ title: 'Nowy kod rabatowy został dodany!' }));
      }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
    useEffect(() => {
        getBooks()
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
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
                <DefaultTextarea name="description" error={errors.description} onChange={handleChange} placeholder='Opis' title="Opis kodu"/>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="startingDate" error={errors.startingDate} onChange={handleChange} value={values.startingDate} type='date' title='Data rozpoczęcia'/>
                <DefaultInput name="expirationDate" error={errors.expirationDate} onChange={handleChange} value={values.expirationDate} type='date' title="Termin ważności"/>
                </div>
                <DefaultSelect name="selectedBooks" error={errors.selectedBooks} onChange={handleBooks} value={values.selectedBooks} options={bookOptions} isMulti={true} title="Egzemplarze objęte kodem rabatowym" placeholder='Egzemplarze książek'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscountCode
