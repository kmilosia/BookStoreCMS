import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { FiMinus, FiPlus } from 'react-icons/fi'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { bookValidate } from '../../utils/validation/newValidate'

function NewBook({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [languageOptions, setLanguageOptions] = useState([])
    const [publisherOptions, setPublisherOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [authorOptions, setAuthorOptions] = useState([])
    const [values, setValues] = useState({
      title: '',
      imageTitle: '',
      imageURL: '',
      description: '',
      selectedLanguage: null,
      selectedPublisher: null,
      selectedCategories: [],
      selectedAuthors: [],
      selectedImages: [],
    })
    const getAuthors = async () => {
      try{
        const response = await axiosClient.get(`/Author`)
        if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name + " " + item.surname
          }))
          setAuthorOptions(options)  
        }
      }catch(err){
        console.log(err)
      }
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
  const getLanguages = async () => {
      try{
        const response = await axiosClient.get(`/Language`)
        if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setLanguageOptions(options)  
        }
      }catch(err){
        console.log(err)
      }
  }
  const getPublishers = async () => {
      try{
        const response = await axiosClient.get(`/Publisher`)
        if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setPublisherOptions(options)  
        }
      }catch(err){
        console.log(err)
      }
  }
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleLanguageInput = (selectedLanguage) => {
      setValues({ ...values, selectedLanguage })
    }
    const handlePublisherInput = (selectedPublisher) => {
      setValues({ ...values, selectedPublisher })
    }
    const handleCategoriesChange = (selectedCategories) => {
      setValues({ ...values, selectedCategories })
    }
    const handleAuthorsChange = (selectedAuthors) => {
      setValues({ ...values, selectedAuthors })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleDeleteImage = (index) => {
      const updatedImages = [...values.selectedImages]
      updatedImages.splice(index, 1)
      setValues({ ...values, selectedImages: updatedImages })
    }
    const handleAddPhoto = () => {
      const newImage = { title: values.imageTitle, imageURL: values.imageURL }
      setValues({
        ...values,
        selectedImages: [...values.selectedImages, newImage],
        imageTitle: '',
        imageURL: '',
      })
    }
    const handleClearAllPhotos = () => {
      setValues({ ...values, selectedImages: [] })
    }
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(bookValidate(values))
    } 
    const finishSubmit = () => {
      const data = {
        title: values.title,
        description: values.description,
        originalLanguageID: values.selectedLanguage.value,
        publisherID: values.selectedPublisher.value,
        listOfBookAuthors: values.selectedAuthors.map((item) => ({
          id: item.value,
        })),
        listOfBookCategories: values.selectedCategories.map((item) => ({
          id: item.value,
        })),
        listOfBookImages: values.selectedImages.map((item, index) => ({
          ...item,
          position: index + 1,
        })),
      };     
        console.log(data)
        postData(data)
        handleCloseModule()
      }
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
      }
    }, [errors])
    useEffect(() => {
      getAuthors()
      getPublishers()
      getCategories()
      getLanguages()
    },[])
  return (
    <div className='module-wrapper shadow-module' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nową książkę</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput error={errors.title} name='title' onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł książki'/>
                <DefaultTextarea error={errors.description} name='description' onChange={handleChange} placeholder='Opis' title='Opis książki'/>
                <div className='divider' />
                <div className='grid grid-cols-2 gap-2'>
                  <DefaultSelect error={errors.selectedLanguage} name='selectedLanguage' onChange={handleLanguageInput} value={values.selectedLanguage} options={languageOptions} title='Język oryginalny' placeholder='Język'/>
                  <DefaultSelect error={errors.selectedPublisher} name='selectedPublisher' onChange={handlePublisherInput} value={values.selectedPublisher} options={publisherOptions} title='Wydawnictwo' placeholder='Wydawnictwo'/>
                </div>
                <DefaultSelect error={errors.selectedAuthors} name='selectedAuthors' isMulti={true} onChange={handleAuthorsChange} value={values.selectedAuthors} options={authorOptions} title='Autorzy' placeholder='Autorzy'/>
                <DefaultSelect error={errors.selectedCategories} name='selectedCategories' isMulti={true} onChange={handleCategoriesChange} value={values.selectedCategories} options={categoryOptions} title='Kategorie' placeholder='Kategorie'/>
                <div className='divider'></div>
                <div className="flex flex-row justify-between items-center my-1">
                  <p className='text-sm mx-1 font-[500] text-dracula-500 dark:text-dracula-400'>Zdjęcia książki</p>
                  {values.selectedImages.length > 0 && 
                  <button onClick={handleClearAllPhotos} className="text-xs px-3 py-1 rounded-sm text-dracula-100 bg-purple-400 hover:bg-purple-500">Wyczyść wszystko</button>
                  }
                </div>
                {values.selectedImages.length > 0 && 
                <div className='flex flex-row flex-wrap'>
                <div className='grid grid-cols-3 gap-2 my-2'>
                  {values.selectedImages.map((item,index)=>(
                    <div key={index} className='flex flex-col rounded-sm bg-dracula-200 dark:bg-dracula-800 dark:text-dracula-300'>
                      <div className='relative'>
                      <img src={item.imageURL} className='w-full h-auto object-cover rounded-t-md aspect-video' />
                      <div className='image-top-gradient image-gradient-position'/>
                      <button onClick={() => handleDeleteImage(index)} className='module-minus-button'><FiMinus/></button>
                      </div>
                      <h3 className='p-2 text-xs'>{item.title}</h3>
                    </div>
                  ))}
                </div>
                </div>}
                <div className='divider' />
                <div className='flex flex-row items-center'>
                  <div className='grid grid-cols-[1fr_2fr] gap-2'>
                    <DefaultInput name='imageTitle' onChange={handleChange} value={values.imageTitle} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                    <DefaultInput name='imageURL' onChange={handleChange} value={values.imageURL} type='text' placeholder='Adres URL' title='Adres URL zdjęcia'/>
                  </div>
                  <button className='module-round-button mt-4' onClick={handleAddPhoto}><FiPlus/></button>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewBook
