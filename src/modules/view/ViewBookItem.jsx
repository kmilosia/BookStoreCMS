import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'

function ViewBookItem(props) {
    const [item, setItem] = useState({})
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        props.getItem(props.editedID,setItem)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
                <h1 className='module-header'>{item?.bookName}</h1>
                <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>  
            <div className='grid grid-cols-3 gap-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Tytuł</p>
                        <h2 className='column-info-text'>{item?.bookName}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Format</p>
                        <h2 className='column-info-text'>{item?.formName}</h2>
                    </div>
                    <div className='flex flex-col'>
                    {item?.formID === 1 ? 
                        <>
                        <p className='column-info-title'>Edycja Okładki</p>
                        <h2 className='column-info-text'>{item?.editionName}</h2>
                        </>
                      : item?.formID === 2 ? 
                      <>
                      <p className='column-info-title'>Format pliku</p>
                      <h2 className='column-info-text'>{item?.fileFormatName}</h2>
                      </>
                      : ""
                    }
                    </div>
            </div>     
            <div className='divider' />
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex flex-col'>
                  <p className='column-info-title'>ISBN</p>
                  <h2 className='column-info-text'>{item?.isbn}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Liczba stron</p>
                  <h2 className='column-info-text'>{item?.pages}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Data wydania</p>
                  <h2 className='column-info-text'>{item?.publishingDate && formatDisplayDate(item.publishingDate)}</h2>
              </div>
            </div>  
            <div className='divider' />
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Podatek VAT</p>
                  <h2 className='column-info-text'>{item?.tax}%</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Netto</p>
                  <h2 className='column-info-text'>{item?.nettoPrice}PLN</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Brutto</p>
                  <h2 className='column-info-text'>{item?.bruttoPrice}PLN</h2>
              </div>
            </div>  
            <div className='divider' />
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Język</p>
                  <h2 className='column-info-text'>{item?.languageName}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Translator</p>
                  <h2 className='column-info-text'>{item?.translatorName}</h2>
              </div>
              <div className='flex flex-col'>
                  <p className='column-info-title'>Dostępna</p>
                  <h2 className='column-info-text'>{item?.availabilityName}</h2>
              </div>
            </div>      
        </div>
    </div>
</div>
  )
}

export default ViewBookItem
