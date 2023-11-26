import React, { useState } from 'react'
import { GiSecretBook } from 'react-icons/gi'
import ShowPasswordButton from '../../components/buttons/ShowPasswordButton'
import { loginValidate } from '../../utils/validation/loginValidate'
import { useEffect } from 'react'
import TextLink from '../../components/buttons/TextLink'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetState } from '../../store/userSlice'
import SubmitButton from '../../components/buttons/SubmitButton'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,error,isAuth,success} = useSelector((state) => state.user)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true)
  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginValidate(inputValues))
    setSubmitting(true)
  }
  const finishSubmit = () => {
    let data = {
      email: inputValues.username, 
      password: inputValues.password,
      audience: 'www',
    }
    dispatch(loginUser(data))
  }
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/');
  //   }
  // }, [isAuth]);
  useEffect(() =>{
    if(success){
    navigate('/')
    dispatch(resetState())
    }
  },[success])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors])
  return (
    <div className='w-screen h-screen flex justify-center items-center' style={{
      background: 'linear-gradient(319deg, rgba(168,85,247,1) 0%, rgba(250,245,255,1) 100%)'
    }}>
    <div className='grid grid-cols-2 w-4/5 h-4/5 bg-white rounded-md shadow-md p-4'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='flex flex-row text-purple-400 w-5/6 cursor-default'>
          <GiSecretBook className='text-3xl mx-1'/>
          <h1 className='text-lg font-semibold font-logo self-end'>Spellarium</h1>
        </div>
      <img src='https://iili.io/JnvTECJ.png' className='h-5/6 w-5/6' alt='Login Vector'/>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-start w-2/3'>
        <h1 className='text-3xl my-2 font-semibold text-dracula-500 cursor-default'>Zaloguj się</h1>
        <div className='my-2 w-full'>
            <div className="relative">
              <input value={inputValues.username} onChange={handleChange} type="text" id='username' name='username' className="floating-form-input peer" placeholder=" " />
              <label htmlFor='username' className="floating-form-label">Nazwa użytkownika</label>
            </div>
            {errors.username && <span className='error-text'>{errors.username}</span>}
            </div>
          <div className="my-2 w-full">
            <div className="relative">
              <ShowPasswordButton inputType='floating' setShowPassword={setShowPassword} showPassword={showPassword} />
              <input value={inputValues.password} onChange={handleChange} type={`${showPassword ? 'password' : 'text'}`} id='password' name='password' className="floating-form-input peer" placeholder=" " />
              <label htmlFor='password' className="floating-form-label">Hasło</label>
            </div>
        {errors.password && <span className='error-text'>{errors.password}</span>}
        </div>
        <TextLink title="Zapomniałeś hasła?" path='/' />
        <SubmitButton loading={loading} title="Zaloguj się" />
      </div>
      {error && <p className='error-text my-1'>{error}</p>}
      </form>
    </div>
    </div>
  )
}

export default Login
