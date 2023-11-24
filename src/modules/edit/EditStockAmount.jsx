import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'

function EditStockAmount(props) {
  const [amount, setAmount] = useState(0)
  const [selectedBook, setSelectedBook] = useState(null)
  const [books, setBooks] = useState([])
  const [bookID, setBookID] = useState(null)
  const [item, setItem] = useState({})

  const getBookItems = async () => {
    try{
      const response = await axiosClient.get(`/BookItems`)
      const bookOptions = response.data.map(item => ({
        value: item.id,
        label: item.bookTitle
      }))
      setBooks(bookOptions)
    }catch(err){
      console.error(err)
    }
  }
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/StockAmount/${id}`)
          setItem(response.data)
          setAmount(response.data.amount)
          setBookID(response.data.bookItemID)
          
        }catch(err){
          console.error(err)
        }
    }
    const handleAmountInput = (e) => {
        setAmount(Number(e.target.value))
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSelectChange = (selectedBook) => {
      if (selectedBook) {
          setSelectedBook(selectedBook)
          setBookID(selectedBook.value)
      } else {
          selectedBook(null)
          setBookID(null)
      }
    }
    const handleAcceptButton = () => {
      const data = {
          id: item.id,
          amount: amount,
          bookItemID: bookID,
          bookTitle: item.bookTitle
      }
      console.log(data);
      props.putData(item.id,data)
      handleCloseModule()
  } 
  useEffect(() => {
    const fetchAllData = async () => {
      await getBookItems();
      await getItem(props.editedID);
    };
    fetchAllData();
  }, []);
  
  useEffect(() => {
    const selected = books.find((col) => col.value === bookID);
    if (selected) {
      setSelectedBook(selected);
    }
  }, [books, bookID]);
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj stan magazynu</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <div className='grid grid-cols-[3fr_1fr] gap-2'>
                <DefaultSelect onChange={handleSelectChange} value={selectedBook} options={books} isMulti={false} placeholder='Egzemplarz' title="Egzemplarz książki"/>
                <DefaultInput value={amount} onChange={handleAmountInput} type='number' placeholder='Ilość' title="Ilość na stanie"/>
                </div>            
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditStockAmount
