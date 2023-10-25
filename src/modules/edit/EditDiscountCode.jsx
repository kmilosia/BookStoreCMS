import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import Select from 'react-select'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { convertDateToInput } from '../../utils/convertDate'

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
    const [discount, setDiscount] = useState([])
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [startingDate, setStartingDate] = useState('')
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
                <input onChange={handleCodeInput} type='text' value={code} className='module-input-text'/>
                <input onChange={handlePercent} type='number' value={percent} className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} value={description} rows={5} className='module-input-textarea'/>
                <input onChange={handleExpirationDate} type='date' value={expirationDate} className='module-input-text'/>
                <input onChange={handleStartingDate} type='date' value={startingDate} className='module-input-text'/>
                <Select onChange={handleBooks} maxMenuHeight={100} value={selectedBooks} options={bookOptions} isClearable={true} isMulti={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Egzemplarze książek'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscountCode
