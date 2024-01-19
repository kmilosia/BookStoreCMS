import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { discountsBannerValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import { useMessageStore } from '../../store/messageStore'

function NewDiscountsBanner({setShowNewModule, postData}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        header: '',
        buttonTitle: '',
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
        setSubmitting(true)
        setErrors(discountsBannerValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(values)
            handleCloseModule()
            setMessage({title: "Baner promocyjny został dodany", type: 'success'})
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy baner promocyjny</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="header" error={errors.header} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł baneru'/>
                    <DefaultInput name="buttonTitle" error={errors.buttonTitle} onChange={handleChange} type='text' placeholder='Tytuł buttona' title='Tytuł buttona'/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="imageTitle" error={errors.imageTitle} onChange={handleChange} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia baneru'/>
                    <DefaultInput name="imageURL" error={errors.imageURL} onChange={handleChange} type='text' placeholder='Adres zdjęcia' title='Adres zdjęcia baneru'/>
                </div>
                {values.imageURL &&
                <div className='w-full h-auto'>
                    <img src={values.imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscountsBanner
