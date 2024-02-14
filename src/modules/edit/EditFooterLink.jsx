import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { footerLinkValidate } from '../../utils/validation/newValidate'
import { getFooterColumns } from '../../api/selectAPI'
import { getValidToken } from '../../api/getValidToken'

function EditFooterLink(props) {
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [columns, setColumns] = useState([])
  const [values, setValues] = useState({
      name: '',
      path: '',
      url: '',
      position: '',
      column: null,
    })
    const getItem = async (id) => {
        try{
          const token = getValidToken()
          if(token){    
          const response = await axiosClient.get(`/FooterLinks/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            const newData = response.data
            setValues({
              name: newData.name,
              position: newData.position,
              path: newData.path,
              url: newData.url,
              column: { value: newData.columnId, label: newData.columnName },
            })
          }}          
        }catch(err){
          console.log(err)
        }
    }
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleColumn = (selected) => {
      setValues({ ...values, column:selected })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
  const handleAcceptButton = () => {
    setSubmitting(true)
    setErrors(footerLinkValidate(values))
  } 
  const finishSubmit = () => {
    const data = {
      name: values.name,
      path: values.path,
      url: values.url,
      position: values.position,
      footerColumnID: values.column.value, 
    }
      props.putData(props.editedID,data)
      handleCloseModule()
    }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])  
  useEffect(() => {
    getFooterColumns(setColumns)
    getItem(props.editedID)
  }, [])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj link footera</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput error={errors.name} value={values.name} name="name" onChange={handleChange} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                <DefaultInput error={errors.position} value={values.position} name="position" onChange={handleChange} type='number' placeholder='Pozycja' title="Pozycja linku w kolumnie"/>
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput value={values.path} name="path" onChange={handleChange} type='text' placeholder='Ścieżka' title="Ścieżka linku"/>
                <DefaultInput value={values.url} name="url" onChange={handleChange} type='text' placeholder='URL' title="Adres URL linku"/>
                </div>
                <DefaultSelect error={errors.column} onChange={handleColumn} value={values.column} options={columns} isMulti={false} placeholder='Kolumna' title="Kolumna footera"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditFooterLink
