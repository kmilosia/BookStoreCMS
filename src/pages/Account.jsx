import React, { useEffect, useState } from 'react'
import ButtonSpinner from '../components/ButtonSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../modules/user/ChangePassword'
import { fetchUserData } from '../store/userSlice'

function Account() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData,loading,error,success} = useSelector((state) => state.user)
  const [isEdited, setIsEdited] = useState(false)
  const [isPasswordModule, setIsPasswordModule] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    phoneNumber: '',
  })
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }
  const handleEditClick = (e) => {
    e.preventDefault()
    setIsEdited(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(editUserData(userDetails))
    console.log(userDetails);
    setIsEdited(false)
  }
  useEffect(() => {
    dispatch(fetchUserData())
  },[])
  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log(userData);
    }
  },[userData])
  // useEffect(() => {
  //   if (success) {
  //     dispatch(resetState())
  //     dispatch(fetchUserData())
  //     setIsEdited(false)
  //   }
  // }, [success])
  return (
    <>
    <div className='main-wrapper overflow-y-auto page-scrollbar'>
        <div className='flex flex-col'>
        <h1 className='main-header mx-0 my-2'>Konto</h1> 
          <div className='rounded-md bg-white dark:bg-dracula-700 flex flex-col px-5 py-5 w-full text-dracula-900 dark:text-white'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-2 w-full 2xl:w-2/3'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='input-label'>Imię</label>
              <input disabled={!isEdited} onChange={handleChange} id='name' name='name' type="text" value={userDetails.name} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='surname' className='input-label'>Nazwisko</label>
              <input disabled={!isEdited} onChange={handleChange} id='surname' name='surname' type="text" value={userDetails.surname} className='input-default'/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor='username' className='input-label'>Nazwa użytkownika</label>
              <input disabled={!isEdited} onChange={handleChange} id='username' name='username' type="text" value={userDetails.username} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='input-label'>Email</label>
              <input disabled={!isEdited} onChange={handleChange} id='email' name='email' type="text" value={userDetails.email} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='phoneNumber' className='input-label'>Numer telefonu</label>
              <input disabled={!isEdited} onChange={handleChange} id='phoneNumber' name='phoneNumber' type="text" value={userDetails.phoneNumber} className='input-default'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='phoneNumber' className='input-label'>Rola</label>
              <input disabled id='role' name='role' type="text" value='Admin' className='input-default'/>
            </div>
            </div>
            <div className='flex'>
            {isEdited ? <button type='submit' className='default-border-button'>{loading ? <ButtonSpinner size={5}/> : <span>Zapisz zmiany</span> }</button>
            : <button onClick={handleEditClick} className='default-border-button'>Edytuj dane</button>
            }
            {isEdited && <button onClick={() => {setIsEdited(false)}} className='default-red-button mx-2'>Anuluj</button>}
            </div>
            </form>
          </div>      
          <div className='rounded-md bg-white dark:bg-dracula-700 flex px-5 py-5 mt-3 w-full text-dracula-900 dark:text-white'>
            <div className='flex flex-col w-full mr-2'>
              <label htmlFor='pass' className='input-label'>Hasło</label>
              <input disabled id='pass' name='pass' type="text" value='****' className='input-default w-full'/>
            </div>
            <button onClick={() => {setIsPasswordModule(true)}} type='button' className='font-medium text-sm border-2 mt-auto mb-2 whitespace-nowrap border-purple-400 text-purple-400 rounded-md py-2 w-max px-10 hover:text-white hover:bg-purple-400'>Zmień hasło</button>
          </div>
        </div>
    </div>
    {isPasswordModule && <ChangePassword setIsPasswordModule={setIsPasswordModule} isPasswordModule={isPasswordModule} />}
    </>
  )
}

export default Account
