import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import Select from 'react-select'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { convertDateToInput } from '../../utils/convertDate'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultSelect from '../../components/forms/DefaultSelect'

function EditDiscount({setShowEditModule, putData, editedID}) {
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
        const response = await axiosClient.get(`/Discount/${id}`)
        setDiscount(response.data)
        setTitle(response.data.title)
        setDescription(response.data.description)
        const expDate = new Date(response.data.expiryDate)
        const startDate = new Date(response.data.startingDate)
        setExpirationDate(convertDateToInput(expDate))
        setStartingDate(convertDateToInput(startDate))
        setPercent(response.data.percentOfDiscount)
        setBooks(response.data.listOfBookItems)
        console.log(response.data);
      }catch(err){
        console.error(err)
      }
    }
    const [discount, setDiscount] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState(new Date())
    const [startingDate, setStartingDate] = useState(new Date())
    const [percent, setPercent] = useState(null)
    const [selectedBooks, setSelectedBooks] = useState([])
    const [bookOptions, setBookOptions] = useState([])
    const [books, setBooks] = useState([])


    const handleTitleInput = (e) => {
      setTitle(e.target.value)
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
            title: title,
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
      const updatedSelectedBooks = books.reduce((selectedBooks, item) => {
        const selected = bookOptions.find((option) => option.value === item.bookId);
        if (selected) {
          return [...selectedBooks, selected];
        }
        return selectedBooks;
      }, []);
      setSelectedBooks(updatedSelectedBooks);
    }, [books, bookOptions]);

  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj promocję</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput value={title} onChange={handleTitleInput} type='text' placeholder='Tytuł' title="Tytuł promocji"/>
                <DefaultInput value={percent} onChange={handlePercent} type='number' placeholder='Wyrażona w %' title="Wartość rabatu"/>
                </div>
                <DefaultTextarea value={description} onChange={handleDescriptionInput} placeholder='Opis' title="Opis promocji"/>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput onChange={handleStartingDate} value={startingDate} type='date' title='Data rozpoczęcia'/>
                <DefaultInput onChange={handleExpirationDate} value={expirationDate} type='date' title="Termin ważności"/>
                </div>
                <DefaultSelect onChange={handleBooks} value={selectedBooks} options={bookOptions} isMulti={true} title="Wszystkie egzemplarze objęte promocją" placeholder='Egzemplarze książek'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscount
