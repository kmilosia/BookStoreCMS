import React from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'

function ViewNewsletter({setShowViewModule,editedItem,setEditedItem}) {
    const handleCloseModule = () => {
        setEditedItem(null)
        setShowViewModule(false)
      }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{editedItem?.title}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł</p>
                    <h2 className='column-info-text'>{editedItem?.title}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Data publikacji</p>
                    <h2 className='column-info-text'>{editedItem?.publicationDate && formatDisplayDate(editedItem.publicationDate)}</h2>
                </div>
                <div className='flex flex-col col-span-2'>
                    <p className='column-info-title'>Treść</p>
                    <h2 className='column-info-text'>{editedItem?.content}</h2>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewNewsletter
