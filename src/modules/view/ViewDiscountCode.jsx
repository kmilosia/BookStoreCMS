import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { convertDateToUserFormat } from '../../utils/convertDate'

function ViewDiscountCode(props) {
    const [discount, setDiscount] = useState({})
    const [expirationDate, setExpirationDate] = useState(null)
    const [startingDate, setStartingDate] = useState(null)
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/DiscountCodes/${id}`)
          setDiscount(response.data)
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
        if (discount.expiryDate) {
            const expDate = new Date(discount.expiryDate);
            setExpirationDate(expDate);
        }
    }, [discount.expiryDate]);
    useEffect(() => {
        if (discount.startingDate) {
            const startDate = new Date(discount.startingDate);
            setStartingDate(startDate);
        }
    }, [discount.startingDate]);
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                    <h1 className='module-header'>{discount.code}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4 my-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Kod</p>
                        <h2 className='column-info-text'>{discount.code}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Wartość rabatu</p>
                        <h2 className='column-info-text'>{discount.percentOfDiscount}%</h2>
                    </div>
                </div>  
                <div className='divider'></div>           
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Data rozpoczęcia</p>
                        <h2 className='column-info-text'>{startingDate ? convertDateToUserFormat(startingDate) : ''}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Termin ważności</p>
                        <h2 className='column-info-text'>{expirationDate ? convertDateToUserFormat(expirationDate) : ''}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Aktywność</p>
                        <h2 className='column-info-text'>{discount.isAvailable ? "Aktywny" : "Nieaktywny"}</h2>
                    </div>
                </div>              
                <div className='divider'></div>           
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Opis</p>
                    <h2 className='column-info-text break-all'>{discount.description}</h2>
                </div>    
                <div className='divider'></div>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Książki objęte kodem</p>
                    <ul className='my-1 h-20 overflow-auto bg-dracula-300 dark:bg-dracula-700 rounded-sm px-2 py-2'>
                    {discount.listOfBookItems && discount.listOfBookItems.map(item => (                 
                        <li key={item.bookId} className='border-b-[1px] py-1 border-dracula-200 dark:border-dracula-600 list-none my-1 text-sm text-dracula-950 dark:text-dracula-100'>{item.bookTitle}</li>
                    ))}
                </ul> 
                </div>                                                           
            </div>
        </div>
    </div>
  )
}

export default ViewDiscountCode
