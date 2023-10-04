import React from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/CloseWindowButton'

function ViewAuthor(props) {
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Author</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Name:</p>
                    <h2 className='mx-2'>Author's name</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Surname:</p>
                    <h2 className='mx-2'>Author's surname</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Description:</p>
                    <h2 className='mx-2'>Some description description description description description description descriptiondescriptiondescriptionv descriptiondescriptionvv descriptionv</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewAuthor
