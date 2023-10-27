import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { convertDateToInput } from '../../utils/convertDate'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultSelect from '../../components/forms/DefaultSelect'

function EditDiscount({setShowEditModule, putData, editedID}) {
  const getBookItems = async () => {
    try{
      const response = await axiosClient.get(`/BookItems`)
      const options = response.data.map(item => ({
        value: item.id,
        label: item.bookTitle
      }))
      setBookItemOptions(options)
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
        setBookItems(response.data.listOfBookItems)
      }catch(err){
        console.error(err)
      }
    }
    const today = new Date().toISOString().split('T')[0];
    const [discount, setDiscount] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState(today)
    const [startingDate, setStartingDate] = useState(today)
    const [percent, setPercent] = useState('')
    const [selectedBookItems, setSelectedBookItems] = useState([])
    const [bookItemOptions, setBookItemOptions] = useState([])
    const [bookItems, setBookItems] = useState([])


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
  const handleBookItems = (selectedBookItems) => {
      setSelectedBookItems(selectedBookItems)
  }
    const handleCloseModule = () => {
        setShowEditModule(false)
    }   
    const handleAcceptButton = () => {
        const bookItemsList = selectedBookItems.map(item => (
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
            listOfBookItems: bookItemsList,
        }
        console.log(data)
        putData(discount.id,data)
        handleCloseModule()
    } 
    useEffect(() => {
        const fetchAll = async () => {
            try{
                getBookItems()
                getItem(editedID)
            }catch(error){
                console.error(error)
            }
        }
        fetchAll()
    },[])
    useEffect(() => {
      console.log(bookItems);
      console.log(bookItemOptions);
    },[bookItems,setBookItems])

    useEffect(() => {
      const updatedSelectedBookItems = bookItems.reduce((selectedBookItems, item) => {
        const selected = bookItemOptions.find((option) => option.value === item.bookItemID);
        if (selected) {
          return [...selectedBookItems, selected];
        }
        return selectedBookItems;
      }, []);
      setSelectedBookItems(updatedSelectedBookItems);
    }, [bookItems, bookItemOptions]);

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
                <DefaultSelect onChange={handleBookItems} value={selectedBookItems} options={bookItemOptions} isMulti={true} title="Wszystkie egzemplarze objęte promocją" placeholder='Egzemplarze książek'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscount
