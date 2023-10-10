import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/CloseWindowButton'

function EditRentalOption({setShowNewModule}) {
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
                <h1 className='module-header'>Edit rental option</h1>
                <input onChange={handleNameInput} type='text' value='Name' className='module-input-text'/>
                <input onChange={handlePriceInput} type='number' value='$86.00' className='module-input-text'/>
                <button className='module-button'>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default EditRentalOption
