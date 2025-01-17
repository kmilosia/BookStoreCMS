import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'

function ViewTranslator(props) {
    const [translator, setTranslator] = useState({})
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        props.getItem(props.editedID,setTranslator)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
                <h1 className='module-header'>{translator?.name} {translator?.surname}</h1>
                <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>  
            <div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Imię</p>
                        <h2 className='column-info-text'>{translator?.name}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Nazwisko</p>
                        <h2 className='column-info-text'>{translator?.surname}</h2>
                    </div>
                </div>              
        </div>
    </div>
</div>
  )
}

export default ViewTranslator
