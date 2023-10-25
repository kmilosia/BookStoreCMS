import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'

function NewDeliveryMethod({setShowNewModule,postData}) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
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
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Dodaj nową formę dostawy</h1>
                <DefaultInput onChange={handleNameInput} type='text' placeholder='Nazwa' title='Nazwa'/>
                <DefaultInput onChange={handlePriceInput} type='number' placeholder='Cena' title='Cena dostawy'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDeliveryMethod
