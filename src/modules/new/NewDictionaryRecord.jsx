import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'

function NewDictionaryRecord({setShowNewModule,postData,title}) {
    const [nameValue, setNameValue] = useState('')
    //onchange method for observing changes in name input
    const handleValueChange = (e) => {
        setNameValue(e.target.value)
    }
    //onclick method for module window to close it
    const handleCloseModule = () => {
        setShowNewModule(false)
    }
    const handleAcceptButton = () => {
        postData(nameValue)
        handleCloseModule()
    } 
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Dodaj {title}</h1>
                <input onChange={handleValueChange} type='text' placeholder='Name' className='module-input-text'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewDictionaryRecord
