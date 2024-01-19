import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { discountCodeValidate } from '../../utils/validation/newValidate'
import { useMessageStore } from '../../store/messageStore'

function NewDiscountCode({setShowNewModule, postData}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values, setValues] = useState({
      code: '',
      description: '',
      percent: '',
      isAvailable: false,
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleAvailableChange = (e) => {
      const isChecked = e.target.checked;
      setValues({ ...values, isAvailable: isChecked });  
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }    
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(discountCodeValidate(values))
      } 
      const finishSubmit = () => {
        const data = {
          code: values.code,
          description: values.description,
          percentOfDiscount: values.percent,
          isAvailable: values.isAvailable
        };     
          postData(data)
          handleCloseModule()
          setMessage({title: "Kod promocyjny został dodany", type: 'success'})
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
                <DefaultTextarea name="description" error={errors.description} onChange={handleChange} placeholder='Opis' title="Opis kodu"/>
                <div class="flex items-center my-2">
                  <input checked={values.isAvailable} onChange={handleAvailableChange} type="checkbox" name='isAvailable' value="" class="w-4 h-4 text-purple-400 bg-gray-100 ring-0 focus:ring-0 border-none rounded dark:bg-gray-700"/>
                  <label htmlFor="isAvailable" class="ml-2 text-sm font-medium text-midnight-900 dark:text-gray-200">Zaznacz jeżeli kod obowiązuje</label>
              </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscountCode
