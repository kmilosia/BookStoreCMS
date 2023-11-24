import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewStockAmount(props) {
    const [stock, setStock] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/StockAmount/${id}`)
          setStock(response.data)
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
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
                <h1 className='module-header'>{stock.bookTitle}</h1>
                <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>  
            <div className='grid grid-cols-3 gap-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>ID Egzamplarza</p>
                        <h2 className='column-info-text'>{stock.bookItemID}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Tytuł książki</p>
                        <h2 className='column-info-text'>{stock.bookTitle}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Ilość na stanie</p>
                        <h2 className='column-info-text'>{stock.amount}</h2>
                    </div>
                </div>              
        </div>
    </div>
</div>
  )
}

export default ViewStockAmount
