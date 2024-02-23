import React from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/buttons/CloseWindowButton'

function ShowTemplateFields({setFieldsModal}) {
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dostępne pola do szablonu dokumentu</h1>
              <CloseWindowButton handleCloseModule={() => setFieldsModal(false)} />
            </div>
            <div className='flex flex-col my-2 w-max'>
                <label htmlFor="file" className="sr-only">Wybierz plik</label>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ShowTemplateFields
