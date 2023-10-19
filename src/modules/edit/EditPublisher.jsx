import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function EditPublisher(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [publisher,setPublisher] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Publisher/${id}`)
          setPublisher(response.data)
          setName(response.data.name)
          setDescription(response.data.description)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        publisher.name = name
        publisher.description = description
        props.putData(publisher.id, publisher)
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
                  <h1 className='module-header'>Edytuj wydawnictwo</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} value={description} rows={4} className='module-input-text'/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditPublisher
