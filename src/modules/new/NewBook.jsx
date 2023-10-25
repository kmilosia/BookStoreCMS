import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { FiMinus, FiPlus } from 'react-icons/fi'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'


function NewBook({setShowNewModule, postData}) {
    const getAuthors = async () => {
        try{
          const response = await axiosClient.get(`/Author`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name + " " + item.surname
          }))
          setAuthorOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getCategories = async () => {
        try{
          const response = await axiosClient.get(`/Category`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCategoryOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getLanguages = async () => {
        try{
          const response = await axiosClient.get(`/Language`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setLanguageOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getPublishers = async () => {
        try{
          const response = await axiosClient.get(`/Publisher`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setPublisherOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const [title, setTitle] = useState('')
    const [imageTitle, setImageTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [description, setDescription] = useState('')
    
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const [selectedPublisher, setSelectedPublisher] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const [selectedImages, setSelectedImages] = useState([])

    const [languageOptions, setLanguageOptions] = useState([])
    const [publisherOptions, setPublisherOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [authorOptions, setAuthorOptions] = useState([])

    const handleImageTitleInput = (e) => {
      setImageTitle(e.target.value)
    }
    const handleImageURLInput = (e) => {
      setImageURL(e.target.value)
    }
    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleLanguageInput = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage)
    }
    const handlePublisherInput = (selectedPublisher) => {
        setSelectedPublisher(selectedPublisher)
    }
    const handleCategoriesChange = (selectedCategories) => {
        setSelectedCategories(selectedCategories)
    }
    const handleAuthorsChange = (selectedAuthors) => {
        setSelectedAuthors(selectedAuthors)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleDeleteImage = (index) => {
      const updatedImages = selectedImages.filter((_,i) => i !== index)
      setSelectedImages(updatedImages)
    }
    const handleAddPhoto = () => {
      setSelectedImages([...selectedImages,{title: imageTitle, imageURL: imageURL}])
      setImageTitle('')
      setImageURL('')
      console.log(selectedImages);
    }
    const handleClearAllPhotos = () => {
      setSelectedImages([])
    }
    const handleAcceptButton = () => {
        const authors = selectedAuthors.map(item => (
            {
                id: item.value
            }
        ))
        const categories = selectedCategories.map(item => (
            {
                id: item.value
            }
        ))
        const data = {
            title: title,
            description: description,
            originalLanguageID: selectedLanguage.value,
            publisherID: selectedPublisher.value,
            listOfBookAuthors: authors,
            listOfBookCategories: categories,
            listOfBookImages: selectedImages
        }
        console.log(data)
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        const fetchAll = async () => {
            try{
                getAuthors()
                getPublishers()
                getCategories()
                getLanguages()
            }catch(error){
                console.error(error)
            }
        }
        fetchAll()
    },[])
  return (
    <div className='module-wrapper shadow-module' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nową książkę</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput onChange={handleTitleInput} type='text' placeholder='Tytuł' title='Tytuł książki'/>
                <DefaultTextarea onChange={handleDescriptionInput} placeholder='Opis' title='Opis książki'/>
                <div className='divider' />
                <div className='grid grid-cols-2 gap-2'>
                  <DefaultSelect onChange={handleLanguageInput} value={selectedLanguage} options={languageOptions} title='Język oryginalny' placeholder='Język'/>
                  <DefaultSelect onChange={handlePublisherInput} value={selectedPublisher} options={publisherOptions} title='Wydawnictwo' placeholder='Wydawnictwo'/>
                </div>
                <DefaultSelect isMulti={true} onChange={handleAuthorsChange} value={selectedAuthors} options={authorOptions} title='Autorzy' placeholder='Autorzy'/>
                <DefaultSelect isMulti={true} onChange={handleCategoriesChange} value={selectedCategories} options={categoryOptions} title='Kategorie' placeholder='Kategorie'/>
                <div className='divider'></div>
                <div className="flex flex-row justify-between items-center my-1">
                  <p className='text-sm mx-1 font-[500] text-dracula-500 dark:text-dracula-400'>Zdjęcia książki</p>
                  {selectedImages.length > 0 && 
                  <button onClick={handleClearAllPhotos} className="text-xs px-3 py-1 rounded-sm text-dracula-100 bg-orange-400 hover:bg-orange-500">Wyczyść wszystko</button>
                  }
                </div>
                {selectedImages.length > 0 && 
                <div className='flex flex-row flex-wrap'>
                <div className='grid grid-cols-3 gap-2 my-2'>
                  {selectedImages.map((item,index)=>(
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
                    <DefaultInput onChange={handleImageTitleInput} value={imageTitle} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                    <DefaultInput onChange={handleImageURLInput} value={imageURL} type='text' placeholder='Adres URL' title='Adres URL zdjęcia'/>
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
