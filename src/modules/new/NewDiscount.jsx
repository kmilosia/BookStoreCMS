import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewDiscount({setShowNewModule, postData}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState(null)
    const [startingDate, setStartingDate] = useState(null)
    const [percent, setPercent] = useState(0)
    const [selectedBooks, setSelectedBooks] = useState([])
    const [bookOptions, setBookOptions] = useState([])
    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }
    const handleSurnameInput = (e) => {
        setSurname(e.target.value)
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
            surname: surname,
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
                  <h1 className='module-header'>Dodaj nowego autora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <input onChange={handleNameInput} type='text' placeholder='Imię' className='module-input-text'/>
                <input onChange={handleSurnameInput} type='text' placeholder='Nazwisko' className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} placeholder='Opis autora' rows={5} className='module-input-textarea'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDiscount
