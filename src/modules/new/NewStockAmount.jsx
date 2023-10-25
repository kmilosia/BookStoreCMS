import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'


function NewStockAmount({setShowNewModule, postData}) {
    const getBookItems = async () => {
        try{
          const response = await axiosClient.get(`/BookItems`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.bookTitle
          }))
          setBooks(options)
        }catch(err){
          console.error(err)
        }
    }
    const [amount, setAmount] = useState('')
    const [selectedBook, setSelectedBook] = useState(null)
    const [books, setBooks] = useState([])
    const [bookID, setBookID] = useState(null)
    const [item, setItem] = useState({})

    const handleAmountInput = (e) => {
        setAmount(Number(e.target.value))
    }
    const handleSelectChange = (selectedBook) => {
        if (selectedBook) {
            setSelectedBook(selectedBook);
            setBookID(selectedBook.value); // Set the columnId state to the selected option's value
        } else {
            setSelectedBook(null);
            setBookID(null); // Reset columnId if no option is selected
        }
    };
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            amount: amount,
            bookItemID: bookID
        }
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        getBookItems()
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy stan magazynu</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <div className='grid grid-cols-[3fr_1fr] gap-2'>
                <DefaultSelect onChange={handleSelectChange} value={selectedBook} options={books} isMulti={false} placeholder='Egzemplarz' title="Egzemplarz książki"/>
                <DefaultInput onChange={handleAmountInput} type='number' placeholder='Ilość' title="Ilość na stanie"/>
                </div> 
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewStockAmount
