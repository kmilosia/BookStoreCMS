import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { convertDateToUserFormat } from '../../utils/functions/convertDate'

function ViewBookItem(props) {
    const [item, setItem] = useState({})
    const [book, setBook] = useState({})
    const [publishingDate, setPublishingDate] = useState(null)
    const getBook = async (id) => {
        try{
          const response = await axiosClient.get(`/Book/${id}`)
          setBook(response.data)
          console.log(response.data);
        }catch(err){
          console.error(err)
        }
    }
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/BookItems/${id}`)
          setItem(response.data)
          console.log(response.data);
        }catch(err){
          console.error(err)
        }
    }
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        getItem(props.editedID)
    },[])
    useEffect(() => {
      if (item.bookID) {
        getBook(item.bookID);
      }
    }, [item]);
    useEffect(() => {
      if (item.publishingDate) {
          const date = new Date(item.publishingDate);
          setPublishingDate(date);
      }
  }, [item.publishingDate]);
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
                <h1 className='module-header'>{book.title}</h1>
                <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>  
            <div className='grid grid-cols-3 gap-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Tytuł</p>
                        <h2 className='column-info-text'>{item.bookName}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Format</p>
                        <h2 className='column-info-text'>{item.formName}</h2>
                    </div>
                    <div className='flex flex-col'>
                    {item.formID === 1 ? 
                        <>
                        <p className='column-info-title'>Edycja Okładki</p>
                        <h2 className='column-info-text'>{item.editionName}</h2>
                        </>
                      : item.formID === 2 ? 
                      <>
                      <p className='column-info-title'>Format pliku</p>
                      <h2 className='column-info-text'>{item.fileFormatName}</h2>
                      </>
                      : ""
                    }
                    </div>
            </div>     
            <div className='divider' />
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex flex-col'>
                  <p className='column-info-title'>ISBN</p>
                  <h2 className='column-info-text'>{item.isbn}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Liczba stron</p>
                  <h2 className='column-info-text'>{item.pages}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Data wydania</p>
                  <h2 className='column-info-text'>{publishingDate ? convertDateToUserFormat(publishingDate) : ''}</h2>
              </div>
            </div>  
            <div className='divider' />
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex flex-col'>
                  <p className='column-info-title'>VAT</p>
                  <h2 className='column-info-text'>{item.vat} %</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Netto</p>
                  <h2 className='column-info-text'>{item.nettoPrice} PLN</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Brutto</p>
                  <h2 className='column-info-text'>{item.bruttoPrice} PLN</h2>
              </div>
            </div>  
            <div className='divider' />
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Język</p>
                  <h2 className='column-info-text'>{item.languageName}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Translator</p>
                  <h2 className='column-info-text'>{item.translatorName}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Dostępna</p>
                  <h2 className='column-info-text'>{item.availabilityName}</h2>
              </div>
            </div>      
        </div>
    </div>
</div>
  )
}

export default ViewBookItem
