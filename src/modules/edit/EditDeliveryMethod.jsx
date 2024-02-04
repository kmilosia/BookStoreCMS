import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { namePriceValidate } from '../../utils/validation/newValidate'

function EditDeliveryMethod(props) {
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [values,setValues] = useState({
      name: '',
      price: '',
  })
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/DeliveryMethod/${id}`)
          if(response.status === 200 || response.status === 204){
            setValues({
              ...values,
              name: response.data.name,
              price: response.data.price
            })
          }
        }catch(err){
          console.log(err)
        }
    }
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
 
  const handleSaveClick = () => {
    setSubmitting(true)
    setErrors(namePriceValidate(values))
  } 
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      props.putData(props.editedID, values)
      props.setEditedID(null)
      props.setShowEditModule(false)
  }
  }, [errors])
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj metodę dostawy</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput value={values.name} error={errors.name} onChange={handleChange} name="name" type='text' placeholder='Nazwa' title='Nazwa'/>
                <DefaultInput value={values.price} error={errors.price} onChange={handleChange} name="price" type='number' placeholder='Cena' title='Cena dostawy'/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDeliveryMethod
