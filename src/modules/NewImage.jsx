import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/CloseWindowButton'

function NewImage({setShowNewModule}) {
    const [url, setUrl] = useState('')
    const handleUrlInput = (e) => {
        setUrl(e.target.value)
    }  
    const handleCloseModule = () => {
        setShowNewModule(false)
    }
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Add new image</h1>
                <File onChange={handleUrlInput}  className='module-input-text'/>
                <button className='module-button'>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default NewImage
