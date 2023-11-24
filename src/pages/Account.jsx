import React, { useEffect, useState } from 'react'
import ButtonSpinner from '../components/ButtonSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../modules/user/ChangePassword'

function Account() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData,loading,error,success} = useSelector((state) => state.user)
  const [isEdited, setIsEdited] = useState(false)
  const [isPasswordModule, setIsPasswordModule] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name: 'Klaudia',
    surname: 'Milo',
    email: 'kmilo@o2.pl',
    username: 'kmilo',
    phoneNumber: '47384378',
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
    // dispatch(fetchUserData())
  },[])
  // useEffect(() => {
  //   if (userData) {
  //     setUserDetails(userData);
  //   }
  // },[userData])
  // useEffect(() => {
  //   if (success) {
  //     dispatch(resetState())
  //     dispatch(fetchUserData())
  //     setIsEdited(false)
  //   }
  // }, [success])
  return (
    <>
    <div className='main-wrapper'>
        <div className='flex flex-col'>
        <h1 className='main-header'>Konto</h1> 
        <div className='grid grid-cols-[1fr_2fr] 2xl:grid-cols-[1fr_3fr] gap-3 my-2 text-dracula-900 dark:text-white'>
          <div className='rounded-md h-full cursor-default bg-white dark:bg-dracula-700 items-center flex flex-col px-5 py-5 w-full'>
            <h1 className='text-xl font-semibold'>Klaudia Miłoszewska</h1>
            <h2 className='font-light text-sm'>Admin</h2>
            <div className='grid grid-cols-[1fr_2fr] gap-2 my-3 w-full'>
              <h3 className='text-sm font-semibold'>Nazwa użytkownika</h3>
              <h4 className='text-sm justify-self-end self-center'>milosia</h4>
              <h3 className='text-sm font-semibold'>Adres email</h3>
              <h4 className='text-sm justify-self-end self-center'>testowyemail@gmail.com</h4>
              <h3 className='text-sm font-semibold'>Numer telefonu</h3>
              <h4 className='text-sm justify-self-end self-center'>+31857385748</h4>
              <h3 className='text-sm font-semibold'>ID użytkownika</h3>
              <h4 className='text-sm justify-self-end self-center'>437875387</h4>
            </div>
            <button onClick={() => {setIsPasswordModule(true)}} type='button' className='font-medium border-2 mt-auto mb-2 border-purple-400 text-purple-400 rounded-md py-2 w-full hover:text-white hover:bg-purple-400'>Zmień hasło</button>
          </div> 
          <div className='rounded-md bg-white dark:bg-dracula-700 flex flex-col px-5 py-5 w-full'>
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

            <div className='flex flex-col'>
              <label htmlFor='username' className='input-label'>Login</label>
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
            </div>
            <div className='flex'>
            {isEdited ? <button type='submit' className='font-medium my-2 border-2 border-purple-400 text-purple-400 rounded-md py-2 px-10 hover:text-white hover:bg-purple-400 flex items-center justify-center'>{loading ? <ButtonSpinner size={5}/> : <span>Zapisz zmiany</span> }</button>
            : <button onClick={handleEditClick} className='font-medium my-2 border-2 border-purple-400 text-purple-400 rounded-md py-2 px-10 hover:text-white hover:bg-purple-400'>Edytuj dane</button>
            }
            {isEdited && <button onClick={() => {setIsEdited(false)}} className='font-medium my-2 mx-2 border-2 border-red-500 text-red-500 rounded-md py-2 px-10 hover:text-white hover:bg-red-500'>Anuluj</button>}
            </div>
            </form>
          </div>       
        </div>
        </div>
    </div>
    {isPasswordModule && <ChangePassword setIsPasswordModule={setIsPasswordModule} isPasswordModule={isPasswordModule} />}
    </>
  )
}

export default Account
