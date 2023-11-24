import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { convertDateToInput } from '../../utils/functions/convertDate'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'

function EditBookItem({setShowEditModule, putData, editedID}) {
    const [item, setItem] = useState([])

    const [vat, setVat] = useState(null)
    const [netto, setNetto] = useState(null)
    const [ISBN, setISBN] = useState('')
    const [pages, setPages] = useState(null)
    const [publishingDate, setPublishingDate] = useState('')
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
          const pubDate = new Date(response.data.publishingDate)
          setPublishingDate(convertDateToInput(pubDate))
          setTranslator(response.data.translatorID)
          setLanguage(response.data.languageID)
          setBook(response.data.bookID)
          setEdition(response.data.editionID)
          setFileFormat(response.data.fileFormatID)
          setForm(response.data.formID)
          setAvailability(response.data.availabilityID)
          console.log(response.data);
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
    const handleTranslator = (selectedTranslator) => {
        setSelectedTranslator(selectedTranslator)
    }
    const handleLanguage = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage)
    }
    const handleEdition = (selectedEdition) => {
        setSelectedEdition(selectedEdition)
    }
    const handleFileFormat = (selectedFileFormat) => {
        setSelectedFileFormat(selectedFileFormat)
    }
    const handleForm = (selectedForm) => {
        setSelectedForm(selectedForm)
    }
    const handleAvailability = (selectedAvailablity) => {
        setSelectedAvailability(setSelectedAvailability)
    }
    const handleBook = (selectedBook) => {
        setSelectedBook(selectedBook)
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
            translatorID: selectedTranslator.value,
            languageID: selectedLanguage.value,
            editionID: selectedEdition.value,
            fileFormatID: selectedFileFormat.value,
            formID: selectedForm.value,
            availabilityID: selectedAvailablity.value,
            bookID: selectedBook.value,
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
    <div className='module-wrapper' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj egzemplarz książki</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <DefaultInput value={vat} onChange={handleVat} placeholder="VAT" type="number" title="VAT"/>
              <DefaultInput value={netto} onChange={handleNetto} placeholder="Netto" type="number" title="NETTO"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-[1fr_2fr_2fr] gap-2'>
              <DefaultInput value={pages} onChange={handlePages} placeholder="Liczba stron" type="number" title="Strony"/>
              <DefaultInput value={ISBN} onChange={handleISBN} placeholder="ISBN" type="text" title="ISBN"/>
              <DefaultInput onChange={handlePublishingDate} placeholder="Data wydania" type="date" value={publishingDate} title="Data wydania"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-2 gap-2'>
              <DefaultSelect onChange={handleLanguage} placeholder="Język" options={languageOptions} value={selectedLanguage} title="Język"/>
              <DefaultSelect onChange={handleTranslator} placeholder="Translator" options={translatorOptions} value={selectedTranslator} title="Translator"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-[2fr_1fr] gap-2'>
              <DefaultSelect onChange={handleBook} placeholder="Podstawowa książka" options={bookOptions} value={selectedBook} title="Podstawowa książka"/>
              <DefaultSelect onChange={handleAvailability} placeholder="Dostępność" options={availabilityOptions} value={selectedAvailablity} title="Dostępność"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-3 gap-2'>
              <DefaultSelect onChange={handleForm} placeholder="Format książki" options={formOptions} value={selectedForm} title="Format książki"/>
              <DefaultSelect onChange={handleEdition} placeholder="Edycja Okładki" options={editionOptions} value={selectedEdition} title="Edycja okładki"/>
              <DefaultSelect onChange={handleFileFormat} placeholder="Format Pliku" options={fileFormatOptions} value={selectedFileFormat} title="Format pliku"/>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default EditBookItem
