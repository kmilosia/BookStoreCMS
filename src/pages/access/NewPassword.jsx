import React, { useEffect, useState } from 'react'
import SubmitButton from '../../components/buttons/SubmitButton'
import { useAuthStore } from '../../store/authStore'
import { newPasswordValidate } from '../../utils/validation/newPasswordValidate'
import { Link, useSearchParams } from 'react-router-dom'
import ShowPasswordButton from '../../components/buttons/ShowPasswordButton'

function NewPassword() {
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')  
  const [submitting, setSubmitting] = useState(false)
  const newPassword = useAuthStore((state) => state.newPassword)
  const error = useAuthStore((state) => state.error)
  const loading = useAuthStore((state) => state.loading)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const [isHiddenPassword, setIsHiddenPassword] = useState(true)
  const [isHiddenRepeatPassword, setIsHiddenRepeatPassword] = useState(true)
  const [inputValues, setInputValues] = useState({
    userId: userId,
    token: token,
    password: '',
    confirmPassword: '',
  })
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrors(newPasswordValidate(inputValues))
  }
  const finishSubmit = () => {
    newPassword(inputValues, setSuccess)
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
    }
  }, [errors])
  return (
    <>
    {success ?
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl my-2 font-semibold text-dracula-500 cursor-default'>Hasło zostało zmienione</h1>
        <p className='font-light text-sm text-dracula-400'>Możesz teraz przejść do logowania.</p>
        <Link className='default-button w-1/2' to='/'>Zaloguj się</Link>
    </div>
    :
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-start w-2/3'>
        <h1 className='text-3xl my-2 font-semibold text-dracula-500 cursor-default'>Resetuj hasło</h1>
        <p className='font-light text-sm text-dracula-400'>Wprowadź nowe hasło.</p>
        <div className='my-2 w-full'>
            <div className="relative">
              <ShowPasswordButton inputType='floating' setShowPassword={setIsHiddenPassword} showPassword={isHiddenPassword} />
              <input value={inputValues.password} onChange={handleChange} type={`${isHiddenPassword ? 'password' : 'text'}`} name='password' className="floating-form-input peer" placeholder="" />
              <label className="floating-form-label">Nowe hasło</label>
            </div>
            {errors.password && <span className='error-text'>{errors.password}</span>}
        </div>
        <div className='my-2 w-full'>
            <div className="relative">
              <ShowPasswordButton inputType='floating' setShowPassword={setIsHiddenRepeatPassword} showPassword={isHiddenRepeatPassword} />
              <input value={inputValues.confirmPassword} onChange={handleChange} type={`${isHiddenRepeatPassword ? 'password' : 'text'}`} name='confirmPassword' className="floating-form-input peer" placeholder="" />
              <label className="floating-form-label">Powtórz hasło</label>
            </div>
            {errors.confirmPassword && <span className='error-text'>{errors.confirmPassword}</span>}
        </div>           
        <SubmitButton loading={loading} title="Zmień hasło" />
      </div>
      {error && <p className='error-text my-1'>{error}</p>}
      </form>}
    </>
  )
}

export default NewPassword
