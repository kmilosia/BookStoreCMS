import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../store/alertSlice'
import { useEffect } from 'react'
import { footerColumnValidate } from '../../utils/validation/newValidate'

function NewFooterColumn({setShowNewModule, postData}) {
    const dispatch = useDispatch()
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values, setValues] = useState({
        name: '',
        position: '',
        htmlObject: '',
        direction: '',
      })
      const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(footerColumnValidate(values))
      } 
      const finishSubmit = () => {
          postData(values)
          handleCloseModule()
          dispatch(showAlert({ title: 'Nowa footer kolumna została dodana!' }));
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
                    <DefaultInput name="htmlObject" error={errors.htmlObject} onChange={handleChange} type='text' placeholder='Obiekt HTML' title='Obiekty HTML kolumny'/>
                    <DefaultInput name="direction" error={errors.direction} onChange={handleChange} type='text' placeholder='Kierunek wyświetlania' title='Kierunek wyświetlania obiektów'/>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterColumn
