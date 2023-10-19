import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function EditRentalType(props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [type,setType] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/RentalType/${id}`)
          setType(response.data)
          setName(response.data.name)
          setPrice(response.data.price)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handlePriceInput = (e) => {
        setPrice(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        type.name = name
        type.price = price
        props.putData(type.id, type)
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
                  <h1 className='module-header'>Edytuj typ wypożyczenia</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
                <input onChange={handlePriceInput} type='number' value={price} className='module-input-text'/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditRentalType
