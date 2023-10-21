import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import Select from 'react-select'
import { useEffect } from 'react'
import {convertDate} from '../../utils/convertDate'

function NewBookItem({setShowNewModule, postData}) {
    const [vat, setVat] = useState(0)
    const [netto, setNetto] = useState(0)
    const [ISBN, setISBN] = useState('')
    const [pages, setPages] = useState(0)
    const [publishingDate, setPublishingDate] = useState(new Date())
    const [translator, setTranslator] = useState(null)
    const [language, setLanguage] = useState(null)
    const [edition, setEdition] = useState(null)
    const [fileFormat, setFileFormat] = useState(null)
    const [form, setForm] = useState(null)
    const [availability, setAvailability] = useState(null)
    const [book, setBook] = useState(null)

    const [translatorOptions, setTranslatorOptions] = useState([])
    const [languageOptions, setLanguageOptions] = useState([])
    const [editionOptions, setEditionOptions] = useState([])
    const [fileFormatOptions, setFileFormatOptions] = useState([])
    const [formOptions, setFormOptions] = useState([])
    const [availabilityOptions, setAvailabilityOptions] = useState([])
    const [bookOptions, setBookOptions] = useState([])


    const getTranslators = async () => {
        try{
          const response = await axiosClient.get(`/Translator`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name + " " + item.surname
          }))
          setTranslatorOptions(options)
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
    const getEditions = async () => {
        try{
          const response = await axiosClient.get(`/Edition`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setEditionOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getFileFormats = async () => {
        try{
          const response = await axiosClient.get(`/FileFormat`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setFileFormatOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getForms = async () => {
        try{
          const response = await axiosClient.get(`/Form`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setFormOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getAvailabilities = async () => {
        try{
          const response = await axiosClient.get(`/Availability`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setAvailabilityOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const getBooks = async () => {
        try{
          const response = await axiosClient.get(`/Book`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.title
          }))
          setBookOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const handleVat = (e) => {
        setVat(Number(e.target.value))
    }
    const handleNetto = (e) => {
        setNetto(Number(e.target.value))
    }
    const handleISBN = (e) => {
        setISBN(e.target.value)
    }
    const handlePages = (e) => {
        setPages(Number(e.target.value))
    }
    const handlePublishingDate = (e) => {
        setPublishingDate(e.target.value)
    }
    const handleTranslator = (translator) => {
        setTranslator(translator)
    }
    const handleLanguage = (language) => {
        setLanguage(language)
    }
    const handleEdition = (edition) => {
        setEdition(edition)
    }
    const handleFileFormat = (fileFormat) => {
        setFileFormat(fileFormat)
    }
    const handleForm = (form) => {
        setForm(form)
    }
    const handleAvailability = (availability) => {
        setAvailability(availability)
    }
    const handleBook = (book) => {
        setBook(book)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const covertedDate = convertDate(publishingDate)
        const data = {
            vat: vat,
            nettoPrice: netto,
            isbn: ISBN,
            pages: pages,
            publishingDate: covertedDate,
            translatorId: translator.value,
            languageId: language.value,
            editionId: edition.value,
            fileFormatId: fileFormat.value,
            formId: form.value,
            availabilityId: availability.value,
            bookId: book.value,
        }
        console.log(data);
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        const fetchAll = async () => {
            try{
                getTranslators()
                getLanguages()
                getEditions()
                getFileFormats()
                getForms()
                getAvailabilities()
                getBooks()
            }catch(error){
                console.error(error)
            }
        }
        fetchAll()
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nowy egzemplarz książki</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <p className='text-sm mx-1 font-[500] text-dracula-500 dark:text-dracula-400'>Informacje podstawowe</p>
            <input onChange={handleVat} type='number' placeholder='Cena VAT' className='module-input-text'/>
            <input onChange={handleNetto} type='number' placeholder='Cena NETTO' className='module-input-text'/>
            <input onChange={handleISBN} type='text' placeholder='ISBN' className='module-input-text'/>
            <input onChange={handlePages} type='number' placeholder='Ilość stron' className='module-input-text'/>
            <input onChange={handlePublishingDate} type='date' className='module-input-text'/>
            <Select onChange={handleTranslator} maxMenuHeight={100} value={translator} options={translatorOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Translator'/>
            <Select onChange={handleLanguage} maxMenuHeight={100} value={language} options={languageOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język'/>
            <Select onChange={handleEdition} maxMenuHeight={100} value={edition} options={editionOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Edycja'/>
            <Select onChange={handleFileFormat} maxMenuHeight={100} value={fileFormat} options={fileFormatOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Format Pliku'/>
            <Select onChange={handleForm} maxMenuHeight={100} value={form} options={formOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Format'/>
            <Select onChange={handleAvailability} maxMenuHeight={100} value={availability} options={availabilityOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Dostępność'/>
            <Select onChange={handleBook} maxMenuHeight={100} value={book} options={bookOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Podstawowa książka'/>

            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewBookItem
