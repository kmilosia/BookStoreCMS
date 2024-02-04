import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { navbarValidate } from '../../utils/validation/newValidate'

function EditNavbarLink(props) {
 const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        path: '',
        name: '',
        position: '',
    })    
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/NavBarMenuLinks/${id}`)
          if(response.status === 200 || response.status === 204){
            setValues(response.data)
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
      setErrors(navbarValidate(values))
    } 
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        props.putData(props.editedID, values)
        handleCloseModule()
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
                  <h1 className='module-header'>Edytuj menu link</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput error={errors.name} onChange={handleChange} name="name" value={values.name} type='text' placeholder='Nazwa' title='Nazwa linku'/>
                    <DefaultInput error={errors.path} onChange={handleChange} name="path" value={values.path} type='text' placeholder='Ścieżka' title='Ścieżka linku'/>
                    <DefaultInput error={errors.position} onChange={handleChange} name="position" value={values.position} type='number' placeholder='Pozycja' title='Pozycja linku'/>
                </div>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditNavbarLink
