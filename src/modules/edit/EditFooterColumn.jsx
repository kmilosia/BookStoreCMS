import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../../api/apiClient'
import CloseWindowButton from '../../components/CloseWindowButton'
import { backgroundOverlayModule } from '../../styles'
import DefaultInput from '../../components/forms/DefaultInput'

function EditFooterColumn(props) {
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [htmlObject, setHtmlObject] = useState('')
    const [direction, setDirection] = useState('')
    const [column,setColumn] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/FooterColumns/${id}`)
          setColumn(response.data)
          setName(response.data.name)
          setPosition(response.data.position)
          setHtmlObject(response.data.htmlObject)
          setDirection(response.data.direction)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handlePositionInput = (e) => {
        setPosition(e.target.value)
    }
    const handleHTMLObjectInput = (e) => {
        setHtmlObject(e.target.value)
    }
    const handleDirection = (e) => {
      setDirection(e.target.value)
  }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        column.name = name
        column.position = position
        column.htmlObject = htmlObject
        column.direction = direction
        props.putData(column.id, column)
        props.setEditedID(null)
        props.setShowEditModule(false)
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj kolumnę footera</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>                
            <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput value={name} onChange={handleNameInput} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                <DefaultInput value={position} onChange={handlePositionInput} type='number' placeholder='Pozycja' title="Pozycja linku w kolumnie"/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <DefaultInput value={htmlObject} onChange={handleHTMLObjectInput} type='text' placeholder='Obiekt HTML' title='Obiekty HTML kolumny'/>
                  <DefaultInput value={direction} onChange={handleDirection} type='text' placeholder='Kierunek wyświetlania' title='Kierunek wyświetlania obiektów'/>
                </div>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
        </div>
    </div>
    </div>
  )
}

export default EditFooterColumn
