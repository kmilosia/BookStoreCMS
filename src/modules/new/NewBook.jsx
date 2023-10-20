import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import Select from 'react-select'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { FiMinus, FiPlus } from 'react-icons/fi'


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
                <input onChange={handleTitleInput} type='text' placeholder='Tytuł książki' className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} placeholder='Opis książki' rows={5} className='module-input-textarea'/>
                <div className='grid grid-cols-2 gap-2'>
                  <Select onChange={handleLanguageInput} maxMenuHeight={100} value={selectedLanguage} options={languageOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
                  <Select onChange={handlePublisherInput} maxMenuHeight={100} value={selectedPublisher} options={publisherOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Wydawnictwo'/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Select onChange={handleAuthorsChange} maxMenuHeight={100} value={selectedAuthors} options={authorOptions} isClearable={true} isSearchable={true} isMulti={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Autor/autorzy'/>
                  <Select onChange={handleCategoriesChange} maxMenuHeight={100} value={selectedCategories} options={categoryOptions} isClearable={true} isMulti={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Kategorie'/>
                </div>
                <div className='divider'></div>
                <div className="flex flex-row justify-between items-center my-1">
                  <p className='text-sm mx-1 font-[500] text-dracula-500 dark:text-dracula-400'>Zdjęcia książki:</p>
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
                <div className='flex flex-row items-center'>
                  <div className='grid grid-cols-[1fr_2fr] gap-2'>
                    <input onChange={handleImageTitleInput} value={imageTitle} type='text' placeholder='Tytuł zdjęcia' className='module-input-text'/>
                    <input onChange={handleImageURLInput} value={imageURL} type='text' placeholder='Adres URL' className='module-input-text'/>
                  </div>
                  <button className='module-round-button' onClick={handleAddPhoto}><FiPlus/></button>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewBook
