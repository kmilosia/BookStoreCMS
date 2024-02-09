import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'

function ViewDiscountsBanner(props) {
    const [banner, setBanner] = useState({})
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        props.getItem(props.editedID,setBanner)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{banner?.header}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł</p>
                    <h2 className='column-info-text'>{banner?.header}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł buttona</p>
                    <h2 className='column-info-text'>{banner?.buttonTitle}</h2>
                </div>
                <div className='flex flex-col col-span-2'>
                    <p className='column-info-title'>Tytuł zdjęcia</p>
                    <h2 className='column-info-text'>{banner?.imageTitle}</h2>
                </div>
                <div className='flex flex-col col-span-2'>
                    <p className='column-info-title'>Adres URL zdjęcia</p>
                    <h2 className='column-info-text'>{banner?.imageURL}</h2>
                </div>
                <div className='col-span-2'>
                    {banner?.imageURL &&
                    <img src={banner.imageURL} className='w-full h-auto object-contain' />
                    }
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewDiscountsBanner
