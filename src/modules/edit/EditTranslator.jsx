import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { personValidate } from '../../utils/validation/newValidate'
import { useMessageStore } from '../../store/messageStore'

function EditTranslator(props) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [translator,setTranslator] = useState({})
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Translator/${id}`)
          setTranslator(response.data)
        }catch(err){
          console.error(err)
        }
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const finishSubmit = () => {
        props.putData(translator.id, translator)
        props.setEditedID(null)
        props.setShowEditModule(false)
        setMessage({title: "Translator został edytowany", type: 'success'})
    }
    const handleSubmit = () => {
      setSubmitting(true)
      setErrors(personValidate(translator))
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
                  <h1 className='module-header'>Edytuj translatora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultInput error={errors.name} value={translator.name} onChange={(e) => setTranslator({...translator, name: e.target.value})} type='text' placeholder='Imię' title='Imię translatora' />
                <DefaultInput error={errors.surname} value={translator.surname} onChange={(e) => setTranslator({...translator, surname: e.target.value})} type='text' placeholder='Nazwisko' title='Nazwisko translatora' />
                <button onClick={handleSubmit} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditTranslator
