import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../../api/apiClient'
import CloseWindowButton from '../../components/CloseWindowButton'
import { backgroundOverlayModule } from '../../styles'

function EditFooterColumn(props) {
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [htmlObject, setHtmlObject] = useState('')
    const [column,setColumn] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/FooterColumns/${id}`)
          setColumn(response.data)
          setName(response.data.name)
          setPosition(response.data.position)
          setHtmlObject(response.data.htmlObject)
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
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        column.name = name
        column.position = position
        column.htmlObject = htmlObject
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
            <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
            <input onChange={handlePositionInput} type='text' value={position} className='module-input-text'/>
            <input onChange={handleHTMLObjectInput} type='text' value={htmlObject} className='module-input-text'/>
            <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
        </div>
    </div>
    </div>
  )
}

export default EditFooterColumn
