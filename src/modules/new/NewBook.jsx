import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import Select from 'react-select'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'


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
    const [description, setDescription] = useState('')
    
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const [selectedPublisher, setSelectedPublisher] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedAuthors, setSelectedAuthors] = useState([])

    const [languageOptions, setLanguageOptions] = useState([])
    const [publisherOptions, setPublisherOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [authorOptions, setAuthorOptions] = useState([])

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
            listOfBookCategories: categories
        }
        // console.log(data);
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
    <div className='absolute h-full w-full top-0 left-0 flex items-center justify-center' style={backgroundOverlayModule}>
        <div className='rounded-md bg-dracula-100 flex flex-col p-6 dark:bg-dracula-900 w-2/5'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='p-4 flex flex-col'>
                <h1 className='text-2xl font-semibold mb-2 text-dracula-900 dark:text-dracula-100'>Dodaj nową książkę</h1>
                <input onChange={handleTitleInput} type='text' placeholder='Tytuł' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-500'/>
                <textarea onChange={handleDescriptionInput} row={4} placeholder='Opis' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-500'/>
                <Select onChange={handleLanguageInput} maxMenuHeight={100} value={selectedLanguage} options={languageOptions} isClearable={true} isSearchable={true} className="my-react-select-container my-2 w-full" classNamePrefix="my-react-select" placeholder='Wybierz język oryginału..'/>
                <Select onChange={handlePublisherInput} maxMenuHeight={100} value={selectedPublisher} options={publisherOptions} isClearable={true} isSearchable={true} className="my-react-select-container my-2 w-full" classNamePrefix="my-react-select" placeholder='Wybierz wydawnictwo..'/>
                <Select onChange={handleAuthorsChange} maxMenuHeight={100} value={selectedAuthors} options={authorOptions} isClearable={true} isSearchable={true} isMulti={true} className="my-react-select-container my-2 w-full " classNamePrefix="my-react-select" placeholder='Wybierz autorów..'/>
                <Select onChange={handleCategoriesChange} maxMenuHeight={100} value={selectedCategories} options={categoryOptions} isClearable={true} isMulti={true} isSearchable={true} className="my-react-select-container my-2 w-full" classNamePrefix="my-react-select" placeholder='Wybierz kategorie..'/>
                <button onClick={handleAcceptButton} className='bg-orange-500 w-[100%] rounded-md py-2 my-2 text-dracula-100 font-semibold transition-all hover:bg-orange-600'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewBook
