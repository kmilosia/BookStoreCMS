import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewTranslator({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleSurnameInput = (e) => {
        setSurname(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            surname: surname,
        }
        postData(data)
        handleCloseModule()
    } 
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nowego translatora</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <input onChange={handleNameInput} type='text' placeholder='Imię' className='module-input-text'/>
            <input onChange={handleSurnameInput} type='text' placeholder='Nazwisko' className='module-input-text'/>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewTranslator
