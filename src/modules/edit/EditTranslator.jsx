import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function EditTranslator(props) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [translator,setTranslator] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Translator/${id}`)
          setTranslator(response.data)
          setName(response.data.name)
          setSurname(response.data.surname)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleSurnameInput = (e) => {
        setSurname(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        translator.name = name
        translator.surname = surname
        props.putData(translator.id, translator)
        props.setEditedID(null)
        props.setShowEditModule(false)
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Edytuj translatora</h1>
                <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
                <input onChange={handleSurnameInput} type='text' value={surname} className='module-input-text'/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditTranslator
