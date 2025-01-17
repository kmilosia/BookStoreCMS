import React, { useState } from 'react'
import ShowPasswordButton from '../../components/buttons/ShowPasswordButton'
import { loginValidate } from '../../utils/validation/loginValidate'
import { useEffect } from 'react'
import SubmitButton from '../../components/buttons/SubmitButton'
import { useAuthStore } from '../../store/authStore'

function Login() {
  const signIn = useAuthStore((state) => state.signIn)
  const error = useAuthStore((state) => state.error)
  const loading = useAuthStore((state) => state.loading)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true)
  const [inputValues, setInputValues] = useState({
    email: '',
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
      email: inputValues.email, 
      password: inputValues.password,
      audience: 'CMS',
    }
    signIn(data)
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors])
  return (
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-start w-2/3'>
        <h1 className='text-3xl my-2 font-semibold text-dracula-500 cursor-default'>Zaloguj się</h1>
        <div className='my-2 w-full'>
            <div className="relative">
              <input value={inputValues.email} onChange={handleChange} type="text" name='email' className="floating-form-input peer" placeholder=" " />
              <label className="floating-form-label">Email</label>
            </div>
            {errors.email && <span className='error-text'>{errors.email}</span>}
            </div>
          <div className="my-2 w-full">
            <div className="relative">
              <ShowPasswordButton inputType='floating' setShowPassword={setShowPassword} showPassword={showPassword} />
              <input value={inputValues.password} onChange={handleChange} type={`${showPassword ? 'password' : 'text'}`} name='password' className="floating-form-input peer" placeholder=" " />
              <label className="floating-form-label">Hasło</label>
            </div>
        {errors.password && <span className='error-text'>{errors.password}</span>}
        </div>
        <SubmitButton loading={loading} title="Zaloguj się" />
      </div>
      {error && <p className='error-text my-1'>{error}</p>}
      </form>
  )
}

export default Login
