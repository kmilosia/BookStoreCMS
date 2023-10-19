import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewPublisher({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            description: description,
        }
        postData(data)
        handleCloseModule()
    } 
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowe wydawnictwo</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <input onChange={handleNameInput} type='text' placeholder='Nazwa' className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} placeholder='Opis' rows={5} className='module-input-textarea'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewPublisher
