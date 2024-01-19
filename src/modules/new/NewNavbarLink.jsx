import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { navbarValidate } from '../../utils/validation/newValidate'
import { useEffect } from 'react'
import { useMessageStore } from '../../store/messageStore'

function NewNavbarLink({setShowNewModule, postData}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values,setValues] = useState({
        path: '',
        name: '',
        position: '',
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(navbarValidate(values))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            console.log(values);
            postData(values)
            handleCloseModule()
            setMessage({title: "Menu link został dodany", type: 'success'})
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj navbar link</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Nazwa' title='Nazwa linku'/>
                    <DefaultInput name="path" error={errors.path} onChange={handleChange} type='text' placeholder='Ścieżka' title='Ścieżka linku'/>
                    <DefaultInput name="position" error={errors.position} onChange={handleChange} type='text' placeholder='Pozycja' title='Pozycja linku'/>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewNavbarLink
