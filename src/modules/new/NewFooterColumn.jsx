import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewFooterColumn({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [htmlObject, setHtmlObject] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handlePositionInput = (e) => {
        setPosition(e.target.value)
    }
    const handleHtmlObjectInput = (e) => {
        setHtmlObject(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            position: position,
            htmlObject: htmlObject
        }
        postData(data)
        handleCloseModule()
    } 
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nową kolumnę footera</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <input onChange={handleNameInput} type='text' placeholder='Nazwa' className='module-input-text'/>
                <input onChange={handlePositionInput} type='text' placeholder='Pozycja' className='module-input-text'/>
                <input onChange={handleHtmlObjectInput} type='text' placeholder='HTML Obiekt' className='module-input-text'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterColumn
