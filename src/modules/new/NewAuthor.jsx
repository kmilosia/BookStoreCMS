import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'

function NewAuthor({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [description, setDescription] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
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
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleNameInput} type='text' placeholder='Imię' title='Imię autora'/>
                    <DefaultInput onChange={handleSurnameInput} type='text' placeholder='Nazwisko' title='Nazwisko autora'/>
                </div>
                <DefaultTextarea onChange={handleDescriptionInput} placeholder='Opis' title="Opis autora"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewAuthor
