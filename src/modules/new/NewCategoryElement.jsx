import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { categoryElementValidate, personValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import { showAlert } from '../../store/alertSlice'
import { useDispatch } from 'react-redux'

function NewCategoryElement({setShowNewModule, postData}) {
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        path: '',
        logo: '',
        content: '',
        position: '',
        imageTitle: '',
        imageURL: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        console.log(values);
        setSubmitting(true)
        setErrors(categoryElementValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(values)
            handleCloseModule()
            dispatch(showAlert({ title: 'Nowy element kategorii został dodany!' }));
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy element kategorii</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="path" error={errors.path} onChange={handleChange} type='text' placeholder='Ścieżka' title='Ścieżka do kategorii'/>
                    <DefaultInput name="logo" error={errors.logo} onChange={handleChange} type='text' placeholder='Logo' title='Logo kategorii'/>
                    <DefaultInput name="position" error={errors.position} onChange={handleChange} type='text' placeholder='Pozycja' title='Pozycja'/>
                    <DefaultInput name="imageURL" error={errors.imageURL} onChange={handleChange} type='text' placeholder='URL zdjęcia' title='Adres URL zdjęcia'/>
                    <DefaultInput name="imageTitle" error={errors.imageTitle} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                </div>
                <DefaultTextarea name="content" onChange={handleChange} placeholder='Treść' title="Treść kategorii"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewCategoryElement
