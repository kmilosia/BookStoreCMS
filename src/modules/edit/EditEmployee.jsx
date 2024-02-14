import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import { useEffect } from 'react'
import { editEmployeeValidate } from '../../utils/validation/newValidate'
import { getValidToken } from '../../api/getValidToken'
import axiosClient from '../../api/apiClient'
import { IoIosClose } from "react-icons/io";
import { FiPlus } from 'react-icons/fi'

function EditEmployee({setShowEditModule, putData, editedID,setEditedID}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [roles,setRoles] = useState([])
    const [newRole,setNewRole] = useState('')
    const [values,setValues] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phoneNumber: '',
        roleNames: [],
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleRole = (e) => {
        setNewRole(e.target.value)
    }
    const handleAddRole = () => {
        if (newRole && !values.roleNames.includes(newRole)) {
            setValues({ ...values, roleNames: [...values.roleNames, newRole] })
            setNewRole('')
        }  
    }
    const handleRemoveRole = (name) => {
        const updatedRoles = values.roleNames.filter(item => item !== name)
        setValues({ ...values, roleNames: updatedRoles })
    }
    const handleCloseModule = () => {
        setShowEditModule(false)
        setEditedID(null)
    }   
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(editEmployeeValidate(values))
    } 
    const getEmployee = async (id) => {
        try{
          const token = getValidToken()
          if(token){  
            const response = await axiosClient.get(`/Admin/Employees/${id}`,{
              headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
            }})
            if(response.status === 200 || response.status === 204){
              setValues(response.data)
            }}
        }catch(err){
            console.log(err);
        }
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
        getEmployee(editedID)
      },[])
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            console.log(values);
            putData(values)
            handleCloseModule()
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj pracownika</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <DefaultInput name="name" error={errors.name} value={values.name} onChange={handleChange} type='text' placeholder='Imię' title='Imię pracownika'/>
                    <DefaultInput name="surname" error={errors.surname} value={values.surname}  onChange={handleChange} type='text' placeholder='Nazwisko' title='Nazwisko pracownika'/>
                    <DefaultInput name="username" error={errors.username} value={values.username}  onChange={handleChange} type='text' placeholder='Nazwa użytkownika' title='Nazwa użytkownika'/>
                    <DefaultInput name="email" error={errors.email} value={values.email}  onChange={handleChange} type='text' placeholder='Email' title='Email'/>
                    <DefaultInput name="phoneNumber" error={errors.phoneNumber} value={values.phoneNumber}  onChange={handleChange} type='text' placeholder='Numer telefonu' title='Numer telefonu'/>
                    <DefaultInput name="password" error={errors.password} value={values.password}  onChange={handleChange} type='text' placeholder='Zmień hasło' title='Hasło'/>                    
                </div>
                <div className='flex flex-row w-full items-center'>
                <div className='flex flex-col w-full mb-1'>
                        <label htmlFor="roleName" className='font-semibold text-xs text-dracula-500 mx-1 my-1 dark:text-dracula-400'>Rola</label>
                        <select name="newRole" id="newRole" onChange={handleRole} value={newRole} className='dark:border-dracula-600 border-2 text-black dark:text-white rounded-md dark:bg-dracula-700 p-1.5'>
                            <option className='text-black dark:text-white' defaultChecked disabled value="">Dodaj rolę</option>
                            {roles?.map((item,index) => {
                                return(
                                    <option value={item} key={index}>{item}</option>
                                )
                            })}
                        </select>
                    </div> 
                    <button onClick={handleAddRole} className='module-round-button mt-4'><FiPlus /></button>
                </div>
                {errors.roleNames && <p className='error-text'>{errors.roleNames}</p>}
                <div className='flex flex-wrap h-max items-center mt-3 mb-2'>
                    {values?.roleNames?.map((item,index) => {
                        return(
                            <div key={index} className='flex pr-1 pl-3 py-1 mr-1 text-sm items-center h-max rounded-md border-2 dark:border-purple-400 dark:text-white cursor-default'>
                                {item}
                                <button onClick={() => handleRemoveRole(item)} className='h-max ml-2 text-xl'><IoIosClose /></button>
                            </div>
                        )
                    })}
                    </div>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditEmployee
