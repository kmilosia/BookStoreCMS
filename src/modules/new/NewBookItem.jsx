import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'
import {convertDate} from '../../utils/functions/convertDate'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultInput from '../../components/forms/DefaultInput'
import { bookItemValidate } from '../../utils/validation/newValidate'
import { useMessageStore } from '../../store/messageStore'

function NewBookItem({setShowNewModule, postData}) {
  const today = new Date().toISOString().split('T')[0];
  const setMessage = useMessageStore((state) => state.setMessage)
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [isEbook, setIsEbook] = useState(null)
  const [values, setValues] = useState({
    vat: 0,
    netto: 0,
    ISBN: '',
    pages: 0,
    publishingDate: today,
    translator: null,
    language: null,
    edition: null,
    fileFormat: null,
    form: null,
    availability: null,
    book: null,
  })
  useEffect(() => {
    if(values.form){
      if(values.form.value === 1){
        setIsEbook(false)
      }else if(values.form.value === 2){
        setIsEbook(true)
      }else{setIsEbook(null)}
    }else{
      setIsEbook(null)
    }
  },[values.form])
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
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
    const handleTranslator = (translator) => {
      setValues({ ...values, translator });
    }
    const handleLanguage = (language) => {
      setValues({ ...values, language });
    }
    const handleEdition = (edition) => {
      setValues({ ...values, edition });
    }
    const handleFileFormat = (fileFormat) => {
      setValues({ ...values, fileFormat });
    }
    const handleForm = (form) => {
      setValues({ ...values, form });
    }
    const handleAvailability = (availability) => {
      setValues({ ...values, availability });
    }
    const handleBook = (book) => {
      setValues({ ...values, book });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(bookItemValidate(values))
    } 
    const finishSubmit = () => {
      const covertedDate = convertDate(values.publishingDate)
      const data = {
        vat: Number(values.vat),
        nettoPrice: Number(values.netto),
        isbn: values.ISBN,
        pages: Number(values.pages),
        publishingDate: covertedDate,
        translatorID: values.translator.value,
        languageID: values.language.value,
        editionID: values.edition ? values.edition.value : null,
        fileFormatID: values.fileFormat ? values.fileFormat.value : null,
        formID: values.form.value,
        availabilityID: values.availability.value,
        bookID: values.book.value,
        };     
        postData(data)
        handleCloseModule()
        setMessage({title: "Egzemplarz został dodany", type: 'success'})
      }
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
      }
    }, [errors])
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
            <h2 className='font-semibold dark:text-white'>Cena książki</h2>
            <div className='grid grid-cols-2 gap-2'>
              <DefaultInput name="vat" error={errors.vat} onChange={handleChange} placeholder="VAT" type="number" title="VAT"/>
              <DefaultInput name="netto" error={errors.netto} onChange={handleChange} placeholder="Netto" type="number" title="NETTO"/>
            </div>
            <h2 className='font-semibold dark:text-white mt-3'>Informacje szczegółowe</h2>
            <div className='grid grid-cols-[1fr_2fr_2fr] gap-2 my-1'>
              <DefaultInput name="pages" error={errors.pages} onChange={handleChange} placeholder="Liczba stron" type="number" title="Strony"/>
              <DefaultInput name="ISBN" error={errors.ISBN} onChange={handleChange} placeholder="ISBN" type="text" title="ISBN"/>
              <DefaultInput name="publishingDate" error={errors.publishingDate} onChange={handleChange} placeholder="Data wydania" type="date" value={values.publishingDate} title="Data wydania"/>
            </div>
            <div className='grid grid-cols-2 gap-2 my-1'>
              <DefaultSelect name="language" error={errors.language} onChange={handleLanguage} placeholder="Język" options={languageOptions} value={values.language} title="Język"/>
              <DefaultSelect name="translator" error={errors.translator} onChange={handleTranslator} placeholder="Translator" options={translatorOptions} value={values.translator} title="Translator"/>
            </div>
            <div className='grid grid-cols-[2fr_1fr] gap-2 my-1'>
              <DefaultSelect name="book" error={errors.book} onChange={handleBook} placeholder="Podstawowa książka" options={bookOptions} value={values.book} title="Podstawowa książka"/>
              <DefaultSelect name="availability" error={errors.availability} onChange={handleAvailability} placeholder="Dostępność" options={availabilityOptions} value={values.availability} title="Dostępność"/>
            </div>
            <div className='grid grid-cols-2 gap-2 my-1'>
              <DefaultSelect name="form" error={errors.form} onChange={handleForm} placeholder="Format książki" options={formOptions} value={values.form} title="Format książki"/>
              {isEbook && <DefaultSelect name="fileFormat" error={errors.fileFormat} onChange={handleFileFormat} placeholder="Format Pliku" options={fileFormatOptions} value={values.fileFormat} title="Format pliku"/>}
              {isEbook === false && <DefaultSelect name="edition" error={errors.edition} onChange={handleEdition} placeholder="Okładka" options={editionOptions} value={values.edition} title="Edycja okładki"/>}
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewBookItem
