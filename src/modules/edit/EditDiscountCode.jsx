import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { convertDateToInput } from '../../utils/functions/convertDate'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultSelect from '../../components/forms/DefaultSelect'

function EditDiscountCode({setShowEditModule, putData, editedID}) {
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
    const getItem = async (id) => {
      try{
        const response = await axiosClient.get(`/DiscountCodes/${id}`)
        setDiscount(response.data)
        setCode(response.data.code)
        setDescription(response.data.description)
        const expDate = new Date(response.data.expiryDate)
        const startDate = new Date(response.data.startingDate)
        setExpirationDate(convertDateToInput(expDate))
        setStartingDate(convertDateToInput(startDate))
        setPercent(response.data.percentOfDiscount)
        setBooks(response.data.listOfBookItems)
      }catch(err){
        console.error(err)
      }
    }
    const today = new Date().toISOString().split('T')[0];
    const [discount, setDiscount] = useState([])
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState(today)
    const [startingDate, setStartingDate] = useState(today)
    const [percent, setPercent] = useState('')
    const [selectedBooks, setSelectedBooks] = useState([])
    const [bookOptions, setBookOptions] = useState([])
    const [books, setBooks] = useState([])


    const handleCodeInput = (e) => {
      setCode(e.target.value)
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
        setShowEditModule(false)
    }   
    const handleAcceptButton = () => {
        const booksList = selectedBooks.map(item => (
            {
                id: item.value
            }
        ))
        const data = {
            id: discount.id,
            code: code,
            description: description,
            percentOfDiscount: percent,
            expiryDate: expirationDate,
            startingDate: startingDate,
            listOfBookItems: booksList,
        }
        console.log(data)
        putData(discount.id,data)
        handleCloseModule()
    } 
    useEffect(() => {
        const fetchAll = async () => {
            try{
                getBooks()
                getItem(editedID)
            }catch(error){
                console.error(error)
            }
        }
        fetchAll()
    },[])

    useEffect(() => {
        console.log(bookOptions);
        console.log(books);
        const updatedSelectedBooks = books.map((item) => {
          return bookOptions.find((option) => option.value === item.bookId);
        });
        setSelectedBooks(updatedSelectedBooks);
      }, [books]);

  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj kod rabatowy</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput value={code} onChange={handleCodeInput} type='text' placeholder='Kod' title="Kod rabatu"/>
                <DefaultInput value={percent} onChange={handlePercent} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <DefaultTextarea value={description} onChange={handleDescriptionInput} placeholder='Opis' title="Opis kodu"/>
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

export default EditDiscountCode
