import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'

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
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj autora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleNameInput} value={name} type='text' placeholder='Imię' title='Imię autora'/>
                    <DefaultInput onChange={handleSurnameInput} value={surname} type='text' placeholder='Nazwisko' title='Nazwisko autora'/>
                </div>
                <DefaultTextarea onChange={handleDescriptionInput} value={description} placeholder='Opis' title="Opis autora"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditAuthor
