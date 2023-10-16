import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function EditAddress(props) {
    const [street, setStreet] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [postcode, setPostcode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const handleStreetInput = (e) => {
        setStreet(e.target.value)
    }
    const handleStreetNumberInput = (e) => {
        setStreetNumber(e.target.value)
    }
    const handleHouseNumberInput = (e) => {
        setHouseNumber(e.target.value)
    }
    const handlePostcodeInput = (e) => {
        setPostcode(e.target.value)
    }
    const handleCityInput = (e) => {
        setCity(e.target.value)
    }
    const handleCountryInput = (e) => {
        setCountry(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
  }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Edit address</h1>
                <input onChange={handleStreetInput} type='text' value='Street' className='module-input-text'/>
                <div className='flex flex-row items-center'>
                    <input onChange={handleStreetNumberInput} type='text' value='Street Number' className='module-input-text w-1/2'/>
                    <input onChange={handleHouseNumberInput} type='text' value='House Number' className='module-input-text w-1/2 ml-4'/>
                </div>
                <input onChange={handlePostcodeInput} type='text' value='Postcode' className='module-input-text'/>
                <div className='flex flex-row items-center'>
                    <input onChange={handleCountryInput} type='text' value='City' className='module-input-text'/>
                    <input onChange={handleCountryInput} type='text' value='Country' className='module-input-text ml-4'/>
                </div>
                <button onClick={handleSaveClick} className='module-button'>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default EditAddress
