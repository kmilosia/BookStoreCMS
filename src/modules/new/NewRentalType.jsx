import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewRentalType({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handlePriceInput = (e) => {
        setPrice(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            price: price,
        }
        postData(data)
        handleCloseModule()
    } 
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy typ wypożyczenia</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <input onChange={handleNameInput} type='text' placeholder='Nazwa' className='module-input-text'/>
                <input onChange={handlePriceInput} type='number' placeholder='Cena' className='module-input-text'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewRentalType
