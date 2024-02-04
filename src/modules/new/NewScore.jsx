import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'

function NewScore({setShowNewModule, postData}) {
    const [errors,setErrors] = useState(null)
    const [value, setValue] = useState('')
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        if(value === ''){
            setErrors('Wprowadź wartość')
        }else{
            if(errors){
                setErrors(null)
            }
            postData({value})
            handleCloseModule()
        }
    } 
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nową ocenę</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <DefaultInput error={errors} name="value" onChange={(e) => setValue(e.target.value)} type='number' placeholder='Ocena' title='Ocena' />
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewScore
