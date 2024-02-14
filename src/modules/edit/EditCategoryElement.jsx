import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { getCategories } from '../../api/selectAPI'
import { categoryElementValidate } from '../../utils/validation/newValidate'
import { getValidToken } from '../../api/getValidToken'

function EditCategoryElement(props) {
    const [values,setValues] = useState({
      path: '',
      logo: '',
      content: '',
      position: '',
      imageTitle: '',
      imageURL: '',
      category: null,
    })
    const [categoryOptions, setCategoryOptions] = useState([])
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const getItem = async (id) => {
        try{
          const token = getValidToken()
          if(token){    
          const response = await axiosClient.get(`/CategoryElements/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            setValues({
              path: response.data.path,
              logo: response.data.logo,
              content: response.data.content,
              position: response.data.position,
              imageTitle: response.data.imageTitle,
              imageURL: response.data.imageURL,
              category: { value: response.data.categoryID, label: response.data.categoryName },
            })
          }}
        }catch(err){
          console.log(err)
        }
    }
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCategory = (category) => {
      setValues({ ...values, category })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
      setSubmitting(true)
      setErrors(categoryElementValidate(values))
  } 
    const finishSubmit = () => {
      const data = {
        path: values.path,
        content: values.content,
        logo: values.logo,
        position: values.position,
        imageTitle: values.imageTitle,
        imageURL: values.imageURL,
        categoryID: values.category.value,
        }
        props.putData(props.editedID, data)
        handleCloseModule()
      }
  useEffect(() => {
    getCategories(setCategoryOptions)
    getItem(props.editedID)
  }, [])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
    }
  }, [errors])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj element kategorii</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="path" error={errors.path} value={values.path} onChange={handleChange} type='text' placeholder='Ścieżka' title='Ścieżka do kategorii'/>
                    <DefaultInput name="logo" error={errors.logo} value={values.logo} onChange={handleChange} type='text' placeholder='Logo' title='Logo kategorii'/>
                    {values.logo &&
                    <div className='w-1/3 h-auto my-2 col-span-2'>
                        <img src={values.logo} className='h-auto w-full object-contain' />
                    </div>
                    }
                    <DefaultInput name="position" error={errors.position} value={values.position} onChange={handleChange} type='number' placeholder='Pozycja' title='Pozycja'/>
                    <DefaultSelect error={errors.category} name="category" value={values.category} onChange={handleCategory} options={categoryOptions} title='Kategoria' placeholder='Kategoria'/>
                    {values.imageURL &&
                    <div className='w-1/3 h-auto col-span-2'>
                        <img src={values.imageURL} className='h-auto w-full object-contain' />
                    </div>
                    }
                    <DefaultInput name="imageURL" error={errors.imageURL} value={values.imageURL} onChange={handleChange} type='text' placeholder='URL zdjęcia' title='Adres URL zdjęcia'/>
                    <DefaultInput name="imageTitle" error={errors.imageTitle} value={values.imageTitle} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                </div>
                <DefaultTextarea name="content" error={errors.content} onChange={handleChange} value={values.content} placeholder='Treść' title="Treść kategorii"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditCategoryElement
