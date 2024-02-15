import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useEffect } from 'react'
import { employeeValidate } from '../../utils/validation/newValidate'
import { getValidToken } from '../../api/getValidToken'
import axiosClient from '../../api/apiClient'

function NewEmployee({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [roles,setRoles] = useState([])
    const [values,setValues] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phoneNumber: '',
        roleName: '',
        isSubscribed: false
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(employeeValidate(values))
    } 
    const getRoles = async () => {
        try{
          const token = getValidToken()
          if(token){  
            const response = await axiosClient.get(`/Admin/Roles`,{
              headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
            }})
            if(response.status === 200 || response.status === 204){
              setRoles(response.data)
            }}
        }catch(err){
            console.log(err);
        }
      }
      useEffect(() => {
        getRoles()
      },[])
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            console.log(values);
            postData(values)
            handleCloseModule()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowego pracownika</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Imię' title='Imię pracownika'/>
                    <DefaultInput name="surname" error={errors.surname} onChange={handleChange} type='text' placeholder='Nazwisko' title='Nazwisko pracownika'/>
                    <DefaultInput name="username" error={errors.username} onChange={handleChange} type='text' placeholder='Nazwa użytkownika' title='Nazwa użytkownika'/>
                    <DefaultInput name="email" error={errors.email} onChange={handleChange} type='text' placeholder='Email' title='Email'/>
                    <DefaultInput name="phoneNumber" error={errors.phoneNumber} onChange={handleChange} type='text' placeholder='Numer telefonu' title='Numer telefonu'/>
                    <DefaultInput name="password" error={errors.password} onChange={handleChange} type='text' placeholder='Hasło' title='Hasło'/>
                    <div className='flex flex-col mb-1'>
                        <label htmlFor="roleName" className='font-semibold text-xs text-dracula-500 mx-1 my-1 dark:text-dracula-400'>Rola</label>
                        <select name="roleName" id="roleName" onChange={handleChange} value={values.roleName} className='dark:border-dracula-600 border-2 text-black dark:text-white rounded-md dark:bg-dracula-700 p-1.5'>
                            <option className='text-black dark:text-white' defaultChecked disabled value="">Wybierz rolę</option>
                            {roles?.map((item,index) => {
                                return(
                                    <option value={item} key={index}>{item}</option>
                                )
                            })}
                        </select>
                        {errors.roleName && <p className='error-text'>{errors.roleName}</p>}
                    </div>
                </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewEmployee
