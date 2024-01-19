import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { useMessageStore } from '../../store/messageStore'
import { rentalTypeValidate } from '../../utils/validation/newValidate'

function EditRentalType(props) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [type,setType] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [errors,setErrors] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/RentalType/${id}`)
          setType(response.data)
        }catch(err){
          console.error(err)
        }
    }
    const handleChange = (e) => {
      setType({ ...type, [e.target.name]: e.target.value });
  }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const finishSubmit = () => {
        props.putData(type.id, type)
        props.setEditedID(null)
        props.setShowEditModule(false)
        setMessage({title: "Typ wypożyczenia został zmieniony", type: 'success'})
    }
    const handleSubmit = () => {
      setSubmitting(true)
      setErrors(rentalTypeValidate(type))
    } 
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj typ wypożyczenia</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput error={errors.name} value={type.name} name='name' onChange={handleChange} type='text' placeholder='Nazwa' title='Nazwa'/>
                <DefaultInput error={errors.days} value={type.days} name='days' onChange={handleChange} type='number' placeholder='Liczba dni' title='Dni wypożyczenia'/>
                <DefaultInput error={errors.price} value={type.price} name='price' onChange={handleChange} type='number' placeholder='Cena' title='Cena wypożyczenia'/>
                <button onClick={handleSubmit} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditRentalType
