import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { convertDate, convertDateToInput } from '../../utils/functions/convertDate'
import { newsletterValidate } from '../../utils/validation/newValidate'

function EditNewsletter(props) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        title: '',
        publicationDate: '',
        content: '',
        isSent: false,
    })
    useEffect(() => {
      const newDate = new Date(props.editedItem.publicationDate)
            setValues({
              title: props.editedItem.title,
              content: props.editedItem.content,
              isSent: props.editedItem.isSent,
              publicationDate: convertDateToInput(newDate)
            })
    },[props.editedItem])
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
      props.setEditedItem(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        setSubmitting(true)
        setErrors(newsletterValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            const convertedDate = convertDate(values.publicationDate)
            setValues(prevValues => ({
                ...prevValues,
                publicationDate: convertedDate,
              }))     
            props.putData(props.editedItem.id, values)
            handleCloseModule()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj newsletter</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput error={errors.title} name="title" onChange={handleChange} value={values.title} type='text' placeholder='Tytuł' title='Tytuł newslettera'/>
                    <DefaultInput error={errors.publicationDate} name="publicationDate" onChange={handleChange} value={values.publicationDate} type='date' placeholder='Data publikacji' title='Data publikacji'/>
                </div>
                <DefaultTextarea error={errors.content} name="content" onChange={handleChange} value={values.content} placeholder='Treść' title="Treść newslettera"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditNewsletter
