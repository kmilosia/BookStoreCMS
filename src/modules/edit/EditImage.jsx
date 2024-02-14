import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { imageValidate } from '../../utils/validation/newValidate'
import { getValidToken } from '../../api/getValidToken'

function EditImage(props) {
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [values,setValues] = useState({
      title: '',
      position: '',
      imageURL: '',
  })
    const getItem = async (id) => {
        try{
          const token = getValidToken()
          if(token){    
          const response = await axiosClient.get(`/Images/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setValues({
              title: response.data.title,
              position: response.data.position,
              imageURL: response.data.imageURL
            })
          }}
        }catch(err){
          console.log(err)
        }
    }
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(imageValidate(values))
    } 
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
          props.putData(props.editedID, values)
          handleCloseModule()
      }
    }, [errors])
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj zdjęcie</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="position" error={errors.position} value={values.position} onChange={handleChange} type='number' placeholder='Pozycja (1 to zdjęcie główne książki)' title='Pozycja'/>
                    <DefaultInput name="title" error={errors.title} value={values.title} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <DefaultInput name="imageURL" error={errors.imageURL} value={values.imageURL} onChange={handleChange} type='text' placeholder='Adres zdjęcia' title='Adres zdjęcia'/>
                </div>
                {values.imageURL &&
                <div className='w-full h-auto'>
                    <img src={values.imageURL} className='w-1/3 h-auto object-contain' />
                </div>
                }
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default EditImage
