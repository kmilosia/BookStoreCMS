import React, { useState, useEffect } from 'react';
import { backgroundOverlayModule } from '../../styles';
import CloseWindowButton from '../../components/buttons/CloseWindowButton';
import axiosClient from '../../api/apiClient';
import { FiMinus, FiPlus } from 'react-icons/fi';
import DefaultSelect from '../../components/forms/DefaultSelect';
import DefaultInput from '../../components/forms/DefaultInput';
import DefaultTextarea from '../../components/forms/DefaultTextarea';
import { bookValidate } from '../../utils/validation/newValidate';

function EditBook({ setShowEditModule, putData, editedID }) {
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [languageOptions, setLanguageOptions] = useState([])
  const [publisherOptions, setPublisherOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [authorOptions, setAuthorOptions] = useState([])
  const [values, setValues] = useState({
    title: '',
    description: '',
    selectedLanguage: null,
    selectedPublisher: null,
    selectedCategories: [],
    selectedAuthors: [],
    selectedImages: [],
    newImageTitle: '',
    newImageURL: ''
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
  useEffect(() => {
    console.log(values);
  },[values])
  useEffect(() => {
    getAuthors()
    getPublishers()
    getCategories()
    getLanguages()
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/Book/${editedID}`)
        if(response.status === 200 || response.status === 204){
          const bookData = response.data
          setValues({
            title: bookData.title,
            description: bookData.description,
            selectedLanguage: { value: bookData.originalLanguageID, label: bookData.originalLanguageName },
            selectedPublisher: { value: bookData.publisherID, label: bookData.publisherName },
            selectedCategories: bookData.categories.map(category => ({ value: category.id, label: category.name })),
            selectedAuthors: bookData.authors.map(author => ({ value: author.id, label: `${author.name} ${author.surname}` })),
            selectedImages: bookData.images,
            newImageTitle: '',
            newImageURL: ''
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [editedID])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleLanguageInput = (selectedLanguage) => {
    setValues(prevValues => ({ ...prevValues, selectedLanguage }))
  }
  const handlePublisherInput = (selectedPublisher) => {
    setValues(prevValues => ({ ...prevValues, selectedPublisher }))
  }
  const handleCategoriesChange = (selectedCategories) => {
    setValues(prevValues => ({ ...prevValues, selectedCategories }))
  }
  const handleAuthorsChange = (selectedAuthors) => {
    setValues(prevValues => ({ ...prevValues, selectedAuthors }))
  }
  const handleImagesChange = (selectedImages) => {
    setValues(prevValues => ({ ...prevValues, selectedImages }))
  }
  const handleCloseModule = () => {
    setShowEditModule(false)
  }
  const handleClearAllPhotos = () => {
    setValues({ ...values, selectedImages: [] })
  }
  const handleDeleteImage = (index) => {
    const updatedImages = [...values.selectedImages]
    updatedImages.splice(index, 1)
    setValues(prevValues => ({ ...prevValues, selectedImages: updatedImages }))
  }
  const handleAddPhoto = () => {
    const newImage = { title: values.newImageTitle, imageURL: values.newImageURL }
    setValues(prevValues => ({
      ...prevValues,
      selectedImages: [...prevValues.selectedImages, newImage],
      newImageTitle: '',
      newImageURL: ''
    }))
  }
  const handleAcceptButton = () => {
    setSubmitting(true)
    setErrors(bookValidate(values))
  }
  const finishSubmit = () => {
    const data = {
      id: editedID,
      title: values.title,
      description: values.description,
      originalLanguageID: values.selectedLanguage.value,
      publisherID: values.selectedPublisher.value,
      listOfBookAuthors: values.selectedAuthors.map(author => ({ id: author.value })),
      listOfBookCategories: values.selectedCategories.map(category => ({ id: category.value })),
      listOfBookImages: values.selectedImages.map((image, index) => ({ ...image, position: index + 1 })),
    }
    putData(editedID, data);
    handleCloseModule();
  }
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
            <h1 className='module-header'>Edytuj książkę</h1>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
          </div>
          <DefaultInput error={errors.title} name="title" value={values.title} onChange={handleChange} type='text' placeholder='Tytuł' title='Tytuł książki'/>
          <DefaultTextarea error={errors.description} name="description" value={values.description} onChange={handleChange} placeholder='Opis' title='Opis książki'/>
          <div className='divider' />
          <div className='grid grid-cols-2 gap-2'>
            <DefaultSelect name="selectedLanguage" error={errors.selectedLanguage} onChange={handleLanguageInput} value={values.selectedLanguage} options={languageOptions} title='Język oryginalny' placeholder='Język'/>
            <DefaultSelect name="selectedPublisher" error={errors.selectedPublisher} onChange={handlePublisherInput} value={values.selectedPublisher} options={publisherOptions} title='Wydawnictwo' placeholder='Wydawnictwo'/>
          </div>
          <DefaultSelect name="selectedAuthors" error={errors.selectedAuthors} isMulti={true} onChange={handleAuthorsChange} value={values.selectedAuthors} options={authorOptions} title='Autorzy' placeholder='Autorzy'/>
          <DefaultSelect name="selectedCategories" error={errors.selectedCategories} isMulti={true} onChange={handleCategoriesChange} value={values.selectedCategories} options={categoryOptions} title='Kategorie' placeholder='Kategorie'/>
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
              {values.selectedImages.map((item, index) => (
                <div key={index} className='flex flex-col rounded-md bg-dracula-200 dark:bg-dracula-800 dark:text-dracula-300'>
                  <div className='relative'>
                    <img src={item.imageURL} className='w-full h-36 object-cover rounded-t-md' alt={item.title} />
                    <button className='absolute top-0 right-0' onClick={() => handleDeleteImage(index)}><FiMinus /></button>
                  </div>
                  <p className='p-1 text-xs font-[400] dark:text-dracula-400'>{item.title}</p>
                </div>
              ))}
            </div>
          </div>}
          <div className='flex flex-row items-center'>
            <div className='grid grid-cols-[1fr_2fr] gap-2'>
              <DefaultInput name="newImageTitle" onChange={handleChange} value={values.newImageTitle} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
              <DefaultInput name="newImageURL" onChange={handleChange} value={values.newImageURL} type='text' placeholder='Adres URL' title='Adres URL zdjęcia'/>
            </div>
            <button className='module-round-button mt-4' onClick={handleAddPhoto}><FiPlus/></button>
          </div>
          <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
