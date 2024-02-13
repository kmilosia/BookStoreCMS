import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useEffect } from 'react'
import { claimValidate } from '../../utils/validation/newValidate'
import { FiPlus } from 'react-icons/fi'
import { IoClose } from "react-icons/io5";

function NewClaims({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [value,setValue] = useState([])
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(null)
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleAdd = () => {
        if(name !== ''){
            if(value.includes(name)){
                setNameError("Podane uprawnienie zostało już dodane!");
            }else{
                if(nameError){
                    setNameError(null)
                }
                setValue([...value,name])
                setName('')
            } 
        }else{
            setNameError("Podaj nazwę uprawnienia!")
        }
    }
    const deleteValueByName = (name) => {
        const updatedValue = value.filter(item => item !== name)
        setValue(updatedValue)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(claimValidate(value))
    } 
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            postData(value)
            handleCloseModule()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowe uprawnienia dostępu</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='flex w-full items-center'>
                    <DefaultInput name="name" error={nameError} value={name} onChange={handleName} type='text' placeholder='Dodaj nowe uprawnienie' title='Uprawnienia dostępu'/>
                    <button onClick={handleAdd} className='module-round-button mt-4'><FiPlus /></button>
                </div>
                {value.length > 0 &&
                <div className='flex flex-wrap items-center my-2'>
                {value.map((item,index) => {
                    return(
                    <div key={index} className='rounded-full border-2 pl-4 pr-2 py-1 text-sm mr-2 border-purple-400 flex items-center dark:text-white'>
                        {item}
                        <button onClick={() => deleteValueByName(item)} className='ml-2 text-lg'><IoClose/></button>
                    </div>
                    )
                })}
                </div>
                }
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
                {errors.value && <p className='error-text'>{errors.value}</p>}
            </div>
        </div>
    </div>
  )
}

export default NewClaims
