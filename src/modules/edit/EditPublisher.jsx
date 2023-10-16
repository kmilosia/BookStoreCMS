import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function EditPublisher(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
  }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Edit publisher</h1>
                <input onChange={handleNameInput} type='text' value='Name' className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} value='Description' rows={3} className='module-input-text'/>
                <button onClick={handleSaveClick} className='module-button'>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default EditPublisher
