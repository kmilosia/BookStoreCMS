import React, { useEffect, useState } from 'react'
import SubmitButton from '../../components/buttons/SubmitButton'
import { useAuthStore } from '../../store/authStore'
import { emailValidate } from '../../utils/validation/emailValidate'

function RecoverPassword() {
  const [submitting, setSubmitting] = useState(false)
  const recoverPassword = useAuthStore((state) => state.recoverPassword)
  const error = useAuthStore((state) => state.error)
  const loading = useAuthStore((state) => state.loading)
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(null)
  const [repeatSend, setRepeatSend] = useState(null)
  const handleRepeatSend = () => {
    if(!repeatSend){
        finishSubmit()
        setRepeatSend(true)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrors(emailValidate(email))
  }
  const finishSubmit = () => {
    const data = {
        email: email
      }
      recoverPassword(data, setEmailSuccess)
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
        finishSubmit()
    }
  }, [errors])
  return (
    <>
    {emailSuccess ?
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl my-2 font-semibold text-dracula-500 cursor-default'>Sprawdź swoją skrzynkę pocztową</h1>
        <p className='font-light text-sm text-dracula-400 mb-2'>Email z linkiem resetującym hasło został wysłany na podany adres email.</p>
        <a href='https://g.co/kgs/bdAn8t' rel="noreferrer" target='_blank' className='default-button w-1/2'>Przejdź do skrzynki</a>
        {repeatSend ? 
        <p className='self-center text-sm font-semibold text-purple-300'>Wiadomość wysłano ponownie</p> :
        <button onClick={handleRepeatSend} className='self-center text-sm font-semibold text-purple-500 hover:text-purple-700' type='button'>Wyślij kod ponownie</button>}
    </div>
    :
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-start w-2/3'>
        <h1 className='text-3xl my-2 font-semibold text-dracula-500 cursor-default'>Resetuj hasło</h1>
        <p className='font-light text-sm text-dracula-400'>Wprowadź email powiązany z twoim kontem.</p>
        <div className='my-2 w-full'>
            <div className="relative">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id='email' name='email' className="floating-form-input peer" placeholder="" />
              <label htmlFor='email' className="floating-form-label">Email</label>
            </div>
            {errors.email && <span className='error-text'>{errors.email}</span>}
            </div>
        <SubmitButton loading={loading} title="Dalej" />
      </div>
      {error && <p className='error-text my-1'>{error}</p>}
      </form>}
    </>
  )
}

export default RecoverPassword
