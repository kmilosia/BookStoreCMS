import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import Select from 'react-select'

function EditBookItem({setShowEditModule, putData, editedID}) {
    const [item, setItem] = useState([])

    const [vat, setVat] = useState(0)
    const [netto, setNetto] = useState(0)
    const [ISBN, setISBN] = useState('')
    const [pages, setPages] = useState(0)
    const [publishingDate, setPublishingDate] = useState(null)
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

    const [selectedTranslator, setSelectedTranslator] = useState(null)
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const [selectedEdition, setSelectedEdition] = useState(null)
    const [selectedFileFormat, setSelectedFileFormat] = useState(null)
    const [selectedForm, setSelectedForm] = useState(null)
    const [selectedAvailablity, setSelectedAvailability] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)


    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/BookItems/${id}`)
          setItem(response.data)
          setVat(response.data.vat)
          setNetto(response.data.nettoPrice)
          setISBN(response.data.isbn)
          setPages(response.data.pages)
          setPublishingDate(response.data.publishingDate)
          setTranslator(response.data.translatorId)
          setLanguage(response.data.languageId)
          setBook(response.data.bookId)
          setEdition(response.data.editionId)
          setFileFormat(response.data.fileFormatId)
          setForm(response.data.formId)
          setAvailability(response.data.availabilityId)
        }catch(err){
          console.error(err)
        }
      }

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
        setVat(e.target.value)
    }
    const handleNetto = (e) => {
        setNetto(e.target.value)
    }
    const handleISBN = (e) => {
        setISBN(e.target.value)
    }
    const handlePages = (e) => {
        setPages(e.target.value)
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
        setShowEditModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            id: item.id,
            vat: vat,
            nettoPrice: netto,
            isbn: ISBN,
            pages: pages,
            publishingDate: publishingDate,
            translatorId: translator.value,
            languageId: language.value,
            editionId: edition.value,
            fileFormatId: fileFormat.value,
            formId: form.value,
            availabilityId: availability.value,
            bookId: book.value,
        }
        putData(item.id,data)
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
                getItem(editedID)
            }catch(error){
                console.error(error)
            }
        }
        fetchAll()
    },[])
    useEffect(() => {
        const selected = translatorOptions.find((x) => x.value === translator)
        if(selected){
          setSelectedTranslator(selected)
        }
      },[translatorOptions,translator])

      useEffect(() => {
        const selected = languageOptions.find((x) => x.value === language)
        if(selected){
          setSelectedLanguage(selected)
        }
      },[languageOptions,language])

      useEffect(() => {
        const selected = editionOptions.find((x) => x.value === edition)
        if(selected){
          setSelectedEdition(selected)
        }
      },[editionOptions,edition])

      useEffect(() => {
        const selected = fileFormatOptions.find((x) => x.value === fileFormat)
        if(selected){
          setSelectedFileFormat(selected)
        }
      },[fileFormatOptions,fileFormat])

      useEffect(() => {
        const selected = formOptions.find((x) => x.value === form)
        if(selected){
          setSelectedForm(selected)
        }
      },[formOptions,form])

      useEffect(() => {
        const selected = availabilityOptions.find((x) => x.value === availability)
        if(selected){
          setSelectedAvailability(selected)
        }
      },[availabilityOptions,availability])

      useEffect(() => {
        const selected = bookOptions.find((x) => x.value === book)
        if(selected){
          setSelectedBook(selected)
        }
      },[bookOptions,book])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj egzemplarz książki</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <p className='text-sm mx-1 font-[500] text-dracula-500 dark:text-dracula-400'>Informacje podstawowe</p>
            <input onChange={handleVat} type='number' value={vat} className='module-input-text'/>
            <input onChange={handleNetto} type='number' value={netto} className='module-input-text'/>
            <input onChange={handleISBN} type='text' value={ISBN} className='module-input-text'/>
            <input onChange={handlePages} type='number' value={pages} className='module-input-text'/>
            <input onChange={handlePublishingDate} type='date' value={publishingDate} className='module-input-text'/>
            <Select onChange={handleTranslator} maxMenuHeight={100} value={selectedTranslator} options={translatorOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
            <Select onChange={handleLanguage} maxMenuHeight={100} value={selectedLanguage} options={languageOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
            <Select onChange={handleEdition} maxMenuHeight={100} value={selectedEdition} options={editionOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
            <Select onChange={handleFileFormat} maxMenuHeight={100} value={selectedFileFormat} options={fileFormatOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
            <Select onChange={handleForm} maxMenuHeight={100} value={selectedForm} options={formOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
            <Select onChange={handleAvailability} maxMenuHeight={100} value={selectedAvailablity} options={availabilityOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>
            <Select onChange={handleBook} maxMenuHeight={100} value={selectedBook} options={bookOptions} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Język oryginału'/>

            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default EditBookItem
