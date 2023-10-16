import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewRentalOption({setShowNewModule}) {
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
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Add new rental option</h1>
                <input onChange={handleNameInput} type='text' placeholder='Name' className='module-input-text'/>
                <input onChange={handlePriceInput} type='number' placeholder='Cost' className='module-input-text'/>
                <button className='module-button'>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default NewRentalOption
