import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { convertDate, convertDateToInput } from '../../utils/functions/convertDate'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { bookItemValidate } from '../../utils/validation/newValidate'
import { getAvailabilities, getBooks, getEditions, getFileFormats, getForms, getLanguages, getTranslators } from '../../api/selectAPI'

function EditBookItem({setShowEditModule, putData, editedID}) {
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [isEbook, setIsEbook] = useState(null)
  const [values, setValues] = useState({
    tax: '',
    netto: '',
    ISBN: '',
    pages: '',
    publishingDate: '',
    translator: null,
    language: null,
    edition: null,
    fileFormat: null,
    form: null,
    availability: null,
    book: null,
  })
    const [translatorOptions, setTranslatorOptions] = useState([])
    const [languageOptions, setLanguageOptions] = useState([])
    const [editionOptions, setEditionOptions] = useState([])
    const [fileFormatOptions, setFileFormatOptions] = useState([])
    const [formOptions, setFormOptions] = useState([])
    const [availabilityOptions, setAvailabilityOptions] = useState([])
    const [bookOptions, setBookOptions] = useState([])
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleTranslator = (translator) => {
      setValues({ ...values, translator })
    }
    const handleLanguage = (language) => {
      setValues({ ...values, language })
    }
    const handleEdition = (edition) => {
      setValues({ ...values, edition })
    }
    const handleFileFormat = (fileFormat) => {
      setValues({ ...values, fileFormat })
    }
    const handleForm = (form) => {
      setValues({ ...values, form })
    }
    const handleAvailability = (availability) => {
      setValues({ ...values, availability })
    }
    const handleBook = (book) => {
      setValues({ ...values, book })
    }
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/BookItems/${id}`)
          if(response.status === 200 || response.status === 204){
            const newDate = new Date(response.data.publishingDate)
            setValues({
              tax: response.data.tax,
              netto: response.data.nettoPrice,
              ISBN: response.data.isbn,
              pages: response.data.pages,
              publishingDate: convertDateToInput(newDate),
              translator: { value: response.data.translatorID, label: response.data.translatorName },
              language: { value: response.data.languageID, label: response.data.languageName },
              edition: { value: response.data.editionID, label: response.data.editionName },
              fileFormat: { value: response.data.fileFormatID, label: response.data.fileFormatName },
              form: { value: response.data.formID, label: response.data.formName },
              availability: { value: response.data.availabilityID, label: response.data.availabilityName },
              book: { value: response.data.bookID, label: response.data.bookName },
            })
          }
  
        }catch(err){
          console.log(err)
        }
      }
    const handleCloseModule = () => {
        setShowEditModule(false)
    }   
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(bookItemValidate(values))
    } 
    const finishSubmit = () => {
      const covertedDate = convertDate(values.publishingDate)
      const data = {
        tax: Number(values.tax),
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
        }
        putData(editedID,data)
        handleCloseModule()
      }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
      useEffect(() => {
        if(values.form){
          if(values.form.value === 1){
            setIsEbook(false)
            setValues({
              ...values,
              fileFormat: null
            })
          }else if(values.form.value === 2){
            setIsEbook(true)
            setValues({
              ...values,
              edition: null
            })
          }else{setIsEbook(null)}
        }else{
          setIsEbook(null)
        }
      },[values.form])
    useEffect(() => {
      getTranslators(setTranslatorOptions)
      getLanguages(setLanguageOptions)
      getEditions(setEditionOptions)
      getFileFormats(setFileFormatOptions)
      getForms(setFormOptions)
      getAvailabilities(setAvailabilityOptions)
      getBooks(setBookOptions)
      getItem(editedID)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj egzemplarz książki</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <DefaultInput name="tax" error={errors.tax} value={values.tax} onChange={handleChange} placeholder="Podatek VAT" type="number" title="Podatek VAT"/>
              <DefaultInput name="netto" error={errors.netto} value={values.netto} onChange={handleChange} placeholder="Cena netto" type="number" title="Cena netto"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-[1fr_2fr_2fr] gap-2'>
              <DefaultInput name="pages" error={errors.pages} value={values.pages} onChange={handleChange} placeholder="Liczba stron" type="number" title="Strony"/>
              <DefaultInput name="ISBN" error={errors.ISBN} value={values.ISBN} onChange={handleChange} placeholder="ISBN" type="text" title="ISBN"/>
              <DefaultInput name="publishingDate" error={errors.publishingDate} value={values.publishingDate} onChange={handleChange} placeholder="Data wydania" type="date" title="Data wydania"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-2 gap-2'>
              <DefaultSelect name="language" error={errors.language} onChange={handleLanguage} placeholder="Język" options={languageOptions} value={values.language} title="Język"/>
              <DefaultSelect name="translator" error={errors.translator} onChange={handleTranslator} placeholder="Translator" options={translatorOptions} value={values.translator} title="Translator"/>
            </div>
            <div className='divider'/>
            <div className='grid grid-cols-[2fr_1fr] gap-2'>
              <DefaultSelect name="book" error={errors.book} onChange={handleBook} placeholder="Podstawowa książka" options={bookOptions} value={values.book} title="Podstawowa książka"/>
              <DefaultSelect name="availability" error={errors.availability} onChange={handleAvailability} placeholder="Dostępność" options={availabilityOptions} value={values.availability} title="Dostępność"/>
            </div>
            <div className='divider'/>
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

export default EditBookItem
