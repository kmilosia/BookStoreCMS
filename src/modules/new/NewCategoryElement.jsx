import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { categoryElementValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import DefaultSelect from '../../components/forms/DefaultSelect'

function NewCategoryElement({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [values,setValues] = useState({
        path: '',
        logo: '',
        content: '',
        position: '',
        imageTitle: '',
        imageURL: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCategory = (selectedCategory) => {
        setSelectedCategory(selectedCategory)
      }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(categoryElementValidate(values))
    } 
    const getCategories = async () => {
        try{
          const response = await axiosClient.get(`/Category`)
          if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCategoryOptions(options)
        }
        }catch(err){
          console.log(err)
        }
    }
    const finishSubmit = () => {
        const data = {
            ...values,
            position: Number(values.position),
            categoryID: selectedCategory.value
        }
        console.log(data);
        postData(data)
        handleCloseModule()
    }
    useEffect(() => {
        getCategories()
    },[])
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
                  <h1 className='module-header'>Dodaj nowy element kategorii</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="path" error={errors.path} onChange={handleChange} type='text' placeholder='Ścieżka' title='Ścieżka do kategorii'/>
                    <DefaultInput name="logo" error={errors.logo} onChange={handleChange} type='text' placeholder='Logo' title='Logo kategorii'/>
                    {values.logo &&
                    <div className='w-1/3 h-auto my-2 col-span-2'>
                        <img src={values.logo} className='h-auto w-full object-contain' />
                    </div>
                    }
                    <DefaultInput name="position" error={errors.position} onChange={handleChange} type='number' placeholder='Pozycja' title='Pozycja'/>
                    <DefaultSelect name='selectedCategory' error={errors.selectedCategory} onChange={handleCategory} value={values.selectedCategory} options={categoryOptions} title='Kategoria' placeholder='Kategoria'/>
                    <DefaultInput name="imageURL" error={errors.imageURL} onChange={handleChange} type='text' placeholder='URL zdjęcia' title='Adres URL zdjęcia'/>
                    <DefaultInput name="imageTitle" error={errors.imageTitle} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                    {values.imageURL &&
                    <div className='w-1/3 h-auto my-2 col-span-2'>
                        <img src={values.imageURL} className='h-auto w-full object-contain' />
                    </div>
                    }
                </div>
                
                <DefaultTextarea name="content" onChange={handleChange} placeholder='Treść' title="Treść kategorii"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewCategoryElement
