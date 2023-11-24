import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import {convertDate}  from '../../utils/functions/convertDate'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultTextarea from '../../components/forms/DefaultTextarea'

function NewDiscountCode({setShowNewModule, postData}) {
    const today = new Date().toISOString().split('T')[0];
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState(today)
    const [startingDate, setStartingDate] = useState(today)
    const [percent, setPercent] = useState(null)
    const [selectedBooks, setSelectedBooks] = useState([])
    const [bookOptions, setBookOptions] = useState([])
    const getBooks = async () => {
        try{
          const response = await axiosClient.get(`/BookItems`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.bookTitle
          }))
          setBookOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const handleCodeInput = (e) => {
        setCode(e.target.value.toUpperCase())
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleExpirationDate = (e) => {
        setExpirationDate(e.target.value)
    }
    const handleStartingDate = (e) => {
        setStartingDate(e.target.value)
    }
    const handlePercent = (e) => {
        setPercent(Number(e.target.value))
    }
    const handleBooks = (selectedBooks) => {
        setSelectedBooks(selectedBooks)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const convertedExpDate = convertDate(expirationDate)
        const convertedStartDate = convertDate(startingDate)
        const booksList = selectedBooks.map(item => (
            {
                id: item.value
            }
        ))
        const data = {
            code: code,
            description: description,
            percentOfDiscount: percent,
            expiryDate: convertedExpDate,
            startingDate: convertedStartDate,
            listOfBookItems: booksList,
        }
        console.log(data);
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        getBooks()
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy kod rabatowy</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput onChange={handleCodeInput} type='text' placeholder='Kod' title="Kod rabatu"/>
                <DefaultInput onChange={handlePercent} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <DefaultTextarea onChange={handleDescriptionInput} placeholder='Opis' title="Opis kodu"/>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput onChange={handleStartingDate} value={startingDate} type='date' title='Data rozpoczęcia'/>
                <DefaultInput onChange={handleExpirationDate} value={expirationDate} type='date' title="Termin ważności"/>
                </div>
                <DefaultSelect onChange={handleBooks} value={selectedBooks} options={bookOptions} isMulti={true} title="Egzemplarze objęte kodem rabatowym" placeholder='Egzemplarze książek'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscountCode
