import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { newsValidate } from '../../utils/validation/newValidate'

function EditNews(props) {
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [values,setValues] = useState({
      topic: '',
      content: '',
      imageTitle: '',
      imageURL: '',
  })
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(newsValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            props.putData(props.editedID,values)
            handleCloseModule()
        }
      }, [errors])
  useEffect(()=> {
    props.getItem(props.editedID,setValues)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj wiadomość</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput error={errors.topic} name='topic' onChange={handleChange} value={values.topic} type='text' placeholder='Tytuł' title='Tytuł wiadomośći'/>
                    <DefaultInput error={errors.imageTitle} name='imageTitle' onChange={handleChange} value={values.imageTitle} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia'/>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <DefaultInput error={errors.imageURL} name='imageURL' onChange={handleChange} value={values.imageURL} type='text' placeholder='Adres zdjęcia' title='Adres URL zdjęcia'/>
                </div>
                {values.imageURL &&
                <div className='w-full h-auto my-2'>
                    <img src={values.imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <DefaultTextarea error={errors.content} name="content" onChange={handleChange} value={values.content} placeholder='Treść' title="Treść wiadomości"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditNews
