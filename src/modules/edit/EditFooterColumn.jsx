import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../../api/apiClient'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { backgroundOverlayModule } from '../../styles'
import DefaultInput from '../../components/forms/DefaultInput'
import { footerColumnValidate } from '../../utils/validation/newValidate'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { getValidToken } from '../../api/getValidToken'

function EditFooterColumn(props) {
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const options = [
    {value: "row", label: "Wiersz"},
    {value: "col", label: "Kolumna"},
  ]
  const [directionOptions, setDirectionOptions] = useState(options)
  const [values, setValues] = useState({
      name: '',
      position: '',
      htmlObject: '',
      direction: null,
    })
    const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleDirection = (selected) => {
    setValues({ ...values, direction:selected })
  }
    const getItem = async (id) => {
        try{
          const token = getValidToken()
          if(token){    
          const response = await axiosClient.get(`/FooterColumns/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            const newData = response.data
            const newDir = directionOptions.find((item) => item.value === response.data.direction)
            setValues({
              name: newData.name,
              position: newData.position,
              htmlObject: newData.htmlObject,
              direction: newDir
            })
          }}
        }catch(err){
          console.log(err)
        }
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
      setSubmitting(true)
      setErrors(footerColumnValidate(values))
    } 
    const finishSubmit = () => {
      const data = {
        name: values.name,
        position: Number(values.position),
        htmlObject: values.htmlObject,
        direction: values.direction.value
      }
      props.putData(props.editedID, data)
      handleCloseModule()
    }
    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
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
              <h1 className='module-header'>Edytuj kolumnę footera</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>                
            <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput name="name" error={errors.name} value={values.name} onChange={handleChange} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                <DefaultInput name="position" error={errors.position} value={values.position} onChange={handleChange} type='number' placeholder='Pozycja' title="Pozycja linku w kolumnie"/>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <DefaultInput name="htmlObject" value={values.htmlObject} error={errors.htmlObject} onChange={handleChange} type='text' placeholder='Obiekt HTML' title='Obiekty HTML kolumny'/>
                  <DefaultSelect name='direction' error={errors.direction} onChange={handleDirection} value={values.direction} options={directionOptions} title='Kierunek wyświetlania obiektów' placeholder='Kierunek wyświetlania'/>
                </div>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
        </div>
    </div>
    </div>
  )
}

export default EditFooterColumn
