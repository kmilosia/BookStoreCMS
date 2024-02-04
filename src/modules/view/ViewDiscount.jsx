import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'

function ViewDiscount(props) {
    const [discount, setDiscount] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Discount/${id}`)
          if(response.status === 200 || response.status === 204){
            setDiscount(response.data)
          }
        }catch(err){
          console.log(err)
        }
    }
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
    }
    useEffect(()=>{
        getItem(props.editedID)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                    <h1 className='module-header'>{discount?.title}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4 my-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Nazwa</p>
                        <h2 className='column-info-text'>{discount?.title}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Wartość promocji</p>
                        <h2 className='column-info-text'>{discount?.percentOfDiscount}%</h2>
                    </div>
                </div>  
                <div className='divider'></div>           
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Data ropoczęcia</p>
                        <h2 className='column-info-text'>{discount?.startingDate && formatDisplayDate(discount.startingDate)}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Data zakończenia</p>
                        <h2 className='column-info-text'>{discount?.expiryDate && formatDisplayDate(discount.expiryDate)}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Aktywność</p>
                        <h2 className='column-info-text'>{discount?.isAvailable ? "Aktywna" : "Zakończona"}</h2>
                    </div>
                </div>              
                <div className='divider'></div>           
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Opis</p>
                    <h2 className='column-info-text break-all'>{discount?.description}</h2>
                </div>    
                <div className='divider'></div>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Książki objęte promocją</p>
                    <div className='flex flex-col border-2 border-gray-200 dark:border-dracula-700 rounded-md'>
                    {discount?.listOfBookItems?.map((item,index) => (                 
                        <div key={index} className={`p-3 text-sm flex flex-col ${index > 0 && 'border-t-2 border-gray-200 dark:border-dracula-700'}`}>
                            <p className='font-semibold'>{item.bookTitle}</p>
                            <p className='font-light'>{item.formName}</p>
                        </div>
                    ))}
                </div> 
                </div>                                                           
            </div>
        </div>
    </div>
  )
}

export default ViewDiscount
