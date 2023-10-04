import React from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/CloseWindowButton'

function ViewDeliveryMethod(props) {
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Delivery Method</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Name:</p>
                    <h2 className='mx-2'>Method's name</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Cost:</p>
                    <h2 className='mx-2'>$20</h2>
                </div>            
            </div>
        </div>
    </div>
  )
}

export default ViewDeliveryMethod
