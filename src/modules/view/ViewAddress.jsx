import React from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function ViewAddress(props) {
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Address</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Street:</p>
                    <h2 className='mx-2'>Street's name</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Street number:</p>
                    <h2 className='mx-2'>Street's number</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>House number:</p>
                    <h2 className='mx-2'>House's number</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Postcode:</p>
                    <h2 className='mx-2'>Postcode's number</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>City:</p>
                    <h2 className='mx-2'>City's name</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Country:</p>
                    <h2 className='mx-2'>Country's name</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewAddress
