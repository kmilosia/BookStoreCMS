import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'

function EditRentalType(props) {
    const [name, setName] = useState('')
    const [days, setDays] = useState('')
    const [price, setPrice] = useState('')
    const [type,setType] = useState({})

    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/RentalType/${id}`)
          setType(response.data)
          setName(response.data.name)
          setDays(response.data.days)
          setPrice(response.data.price)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleDaysInput = (e) => {
      setDays(e.target.value)
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
        type.days = days
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
                <DefaultInput value={name} onChange={handleNameInput} type='text' placeholder='Nazwa' title='Nazwa'/>
                <DefaultInput value={days} onChange={handleDaysInput} type='number' placeholder='Liczba dni' title='Dni wypożyczenia'/>
                <DefaultInput value={price} onChange={handlePriceInput} type='number' placeholder='Cena' title='Cena wypożyczenia'/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditRentalType
