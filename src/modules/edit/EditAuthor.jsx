import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function EditAuthor(props) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [description, setDescription] = useState('')
    const [author,setAuthor] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Author/${id}`)
          setAuthor(response.data)
          setName(response.data.name)
          setSurname(response.data.surname)
          setDescription(response.data.description)
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
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        author.name = name
        author.surname = surname
        author.description = description
        props.putData(author.id, author)
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
                <h1 className='module-header'>Edytuj autora</h1>
                <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
                <input onChange={handleSurnameInput} type='text' value={surname} className='module-input-text'/>
                <textarea onChange={handleDescriptionInput} value={description} rows={3} className='module-input-text'/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditAuthor
