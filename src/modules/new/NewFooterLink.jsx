import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { useMessageStore } from '../../store/messageStore'
import { footerLinkValidate } from '../../utils/validation/newValidate'

function NewFooterLink({setShowNewModule, postData}) {
    const getFooterColumns = async () => {
        try{
          const response = await axiosClient.get(`/FooterColumns`)
          const optionColumns = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setColumns(optionColumns)
        }catch(err){
          console.error(err)
        }
    }
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values, setValues] = useState({
        name: '',
        path: '',
        url: '',
        position: '',
        selectedOption: null,
      })
      const [columns, setColumns] = useState([])
      const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSelectChange = (selectedOption) => {
        setValues({ ...values, selectedOption });
      }
    const handleCloseModule = () => {
        setShowNewModule(false)
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
          footerColumnID: values.selectedOption.value, 
        };     
          postData(data)
          handleCloseModule()
          setMessage({title: "Link footera został dodany", type: 'success'})
        }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors]) 
    useEffect(() => {
        getFooterColumns()
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy link footera</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                <DefaultInput name="position" error={errors.position} onChange={handleChange} type='number' placeholder='Pozycja' title="Pozycja linku"/>
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput name="path" error={errors.path} onChange={handleChange} type='text' placeholder='Ścieżka' title="Ścieżka linku"/>
                <DefaultInput name="url" error={errors.url} onChange={handleChange} type='text' placeholder='URL' title="Adres URL linku"/>
                </div>
                <DefaultSelect name="selectedOption" error={errors.selectedOption} onChange={handleSelectChange} value={values.selectedOption} options={columns} isMulti={false} placeholder='Kolumna' title="Kolumna footer'a"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterLink
