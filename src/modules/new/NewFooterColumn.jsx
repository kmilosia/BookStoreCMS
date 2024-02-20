import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useEffect } from 'react'
import { footerColumnValidate } from '../../utils/validation/newValidate'
import DefaultSelect from '../../components/forms/DefaultSelect'

function NewFooterColumn({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const options = [
      {value: "row", label: "Wiersz"},
      {value: "col", label: "Kolumna"},
    ]
    const htmlOptions = [
      {value: 'Link', label: 'Link wewnętrzny'},
      {value: 'Image', label: 'Zdjęcie'},
      {value: 'Icon Anchor', label: 'Ikona'},
      {value: 'Anchor', label: 'Link zewnętrzny'},
    ]
    const [directionOptions, setDirectionOptions] = useState(options)
    const [values, setValues] = useState({
        name: '',
        position: '',
        htmlObject: '',
        direction: null,
      })
      const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleDirection = (selected) => {
      setValues({ ...values, direction:selected })
    }
    const handleHtml = (selected) => {
      setValues({ ...values, htmlObject:selected })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(footerColumnValidate(values))
      } 
      const finishSubmit = () => {
        const data = {
          name: values.name,
          position: Number(values.position),
          htmlObject: values.htmlObject,
          direction: values.direction.value
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
                  <h1 className='module-header'>Dodaj nową kolumnę footera</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                    <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                    <DefaultInput name="position" error={errors.position} onChange={handleChange} type='number' placeholder='Pozycja' title="Pozycja linku w kolumnie"/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultSelect name="htmlObject" error={errors.htmlObject} onChange={handleHtml} value={values.htmlObject} options={htmlOptions} placeholder='Obiekt HTML' title='Obiekty HTML kolumny'/>
                    <DefaultSelect name='direction' error={errors.direction} onChange={handleDirection} value={values.direction} options={directionOptions} title='Kierunek wyświetlania obiektów' placeholder='Kierunek wyświetlania'/>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterColumn
