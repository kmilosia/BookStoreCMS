import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'

function ViewFooterColumn(props) {
    const [column, setColumn] = useState({})
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        props.getItem(props.editedID,setColumn)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{column?.name}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Nazwa</p>
                    <h2 className='column-info-text'>{column?.name}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Pozycja</p>
                    <h2 className='column-info-text'>{column?.position}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>HTML Obiekt</p>
                    <h2 className='column-info-text'>{column?.htmlObject}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Kierunek wyświetlania</p>
                    <h2 className='column-info-text'>{column?.direction === 'row' ? 'Wiersz' : 'Kolumna'}</h2>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewFooterColumn
