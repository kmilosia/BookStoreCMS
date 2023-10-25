import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'
import {convertDate} from '../../utils/convertDate'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultInput from '../../components/forms/DefaultInput'

function NewBookItem({setShowNewModule, postData}) {
  const today = new Date().toISOString().split('T')[0];
    const [vat, setVat] = useState(0)
    const [netto, setNetto] = useState(0)
    const [ISBN, setISBN] = useState('')
    const [pages, setPages] = useState(0)
    const [publishingDate, setPublishingDate] = useState(today)
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
            <div className='grid grid-cols-2 gap-2'>
              <DefaultInput onChange={handleVat} placeholder="VAT" type="number" title="VAT"/>
              <DefaultInput onChange={handleNetto} placeholder="Netto" type="number" title="NETTO"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-[1fr_2fr_2fr] gap-2'>
              <DefaultInput onChange={handlePages} placeholder="Liczba stron" type="number" title="Strony"/>
              <DefaultInput onChange={handleISBN} placeholder="ISBN" type="text" title="ISBN"/>
              <DefaultInput onChange={handlePublishingDate} placeholder="Data wydania" type="date" value={publishingDate} title="Data wydania"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-2 gap-2'>
              <DefaultSelect onChange={handleLanguage} placeholder="Język" options={languageOptions} value={language} title="Język"/>
              <DefaultSelect onChange={handleTranslator} placeholder="Translator" options={translatorOptions} value={translator} title="Translator"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-[2fr_1fr] gap-2'>
              <DefaultSelect onChange={handleBook} placeholder="Podstawowa książka" options={bookOptions} value={book} title="Podstawowa książka"/>
              <DefaultSelect onChange={handleAvailability} placeholder="Dostępność" options={availabilityOptions} value={availability} title="Dostępność"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-3 gap-2'>
              <DefaultSelect onChange={handleForm} placeholder="Format książki" options={formOptions} value={form} title="Format książki"/>
              <DefaultSelect onChange={handleEdition} placeholder="Edycja Okładki" options={editionOptions} value={edition} title="Edycja okładki"/>
              <DefaultSelect onChange={handleFileFormat} placeholder="Format Pliku" options={fileFormatOptions} value={fileFormat} title="Format pliku"/>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewBookItem
