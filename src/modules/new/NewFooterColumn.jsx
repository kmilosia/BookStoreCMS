import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'

function NewFooterColumn({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [htmlObject, setHtmlObject] = useState('')
    const [direction, setDirection] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handlePositionInput = (e) => {
        setPosition(e.target.value)
    }
    const handleHtmlObjectInput = (e) => {
        setHtmlObject(e.target.value)
    }
    const handleDirection = (e) => {
        setDirection(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            position: position,
            htmlObject: htmlObject,
            direction: direction
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
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                    <DefaultInput onChange={handleNameInput} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                    <DefaultInput onChange={handlePositionInput} type='number' placeholder='Pozycja' title="Pozycja linku w kolumnie"/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleHtmlObjectInput} type='text' placeholder='Obiekt HTML' title='Obiekty HTML kolumny'/>
                    <DefaultInput onChange={handleDirection} type='text' placeholder='Kierunek wyświetlania' title='Kierunek wyświetlania obiektów'/>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterColumn
