import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import {showAlert} from '../../store/alertSlice'
import { editAuthor, getAuthor } from '../../api/authorAPI'
import Spinner from '../../components/Spinner'
import { personValidate } from '../../utils/validation/newValidate'
import ButtonSpinner from '../../components/ButtonSpinner'

function EditAuthor({handleAfterSubmit,handleCloseModule,editedID}) {
    const dispatch = useDispatch()
    const [author,setAuthor] = useState({})
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const handleChange = (e) => {
      setAuthor((prevAuthor) => {
        return { ...prevAuthor, [e.target.name]: e.target.value }
      })
    }
    const handleSaveClick = () => {
      setErrors(personValidate(author))
      setSubmitting(true)
  }
  useEffect(()=> {
    getAuthor(editedID, setAuthor, setLoading)
  },[])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      editAuthor(author,setSubmitLoading)
      handleAfterSubmit()
      dispatch(showAlert({ title: 'Autor został edytowany!' }));
      }
  }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
          {loading ? <Spinner /> :
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj autora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput error={errors.name} name="name" onChange={handleChange} value={author?.name} type='text' placeholder='Imię' title='Imię autora'/>
                    <DefaultInput error={errors.surname} name="surname" onChange={handleChange} value={author?.surname} type='text' placeholder='Nazwisko' title='Nazwisko autora'/>
                </div>
                <DefaultTextarea error={errors.description} name="description" onChange={handleChange} value={author?.description} placeholder='Opis' title="Opis autora"/>
                <button onClick={handleSaveClick} className='module-button'>{submitLoading ? <ButtonSpinner /> : 'Akceptuj'}</button>
            </div>
          }
        </div>
    </div>
  )
}

export default EditAuthor
