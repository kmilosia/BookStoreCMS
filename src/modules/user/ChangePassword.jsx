import React from 'react'
import { useState } from 'react'
import CloseWindowButton from '../../components/buttons/CloseWindowButton';
import ShowPasswordButton from '../../components/buttons/ShowPasswordButton';
import ButtonSpinner from '../../components/ButtonSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { backgroundOverlayModule } from '../../styles';
import SubmitButton from '../../components/buttons/SubmitButton';
import { useEffect } from 'react';
import { changePassword, resetState } from '../../store/userSlice';
import { resetPasswordValidate } from '../../utils/validation/resetPasswordValidate';
import { showAlert } from '../../store/alertSlice';

function ChangePassword({setIsPasswordModule}) {
    const dispatch = useDispatch()
    const {loading,error,success} = useSelector((state) => state.user)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false); 
    const [isHiddenPassword, setIsHiddenPassword] = useState(true)
    const [isHiddenRepeatPassword, setIsHiddenRepeatPassword] = useState(true)
    const [isHiddenOldPassword, setIsHiddenOldPassword] = useState(true)
    const [userDetails, setUserDetails] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(resetPasswordValidate(userDetails))
        setSubmitting(true)
      }
      const finishSubmit = () => {
        const data = {
            oldPassword: userDetails.oldPassword,
            newPassword: userDetails.newPassword,
            repeatNewPassword: userDetails.confirmPassword
        }
        dispatch(changePassword(data))
      }
    const handleClose = () => {
        setIsPasswordModule(false)
    }
    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(resetState())
            dispatch(showAlert({ title: 'Hasło zostało zmienione!' }));
        }
      }, [success])
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit();
        }
      }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window w-[40rem]'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Zmień hasło</h1>
              <CloseWindowButton handleCloseModule={handleClose} />
            </div>
            <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor='oldPassword' className='input-label'>Stare hasło</label>
                    <div className='relative'>
                        <input onChange={handleChange} id='oldPassword' name='oldPassword' type={`${isHiddenOldPassword ? 'password' : 'text'}`} value={userDetails.oldPassword} className='module-input-text'/>
                        <ShowPasswordButton setShowPassword={setIsHiddenOldPassword} showPassword={isHiddenOldPassword} />
                    </div>
                    {errors.oldPassword && <p className='error-text'>{errors.oldPassword}</p>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='newPassword' className='input-label'>Nowe hasło</label>
                    <div className='relative'>
                        <input onChange={handleChange} id='newPassword' name='newPassword' type={`${isHiddenPassword ? 'password' : 'text'}`} value={userDetails.newPassword} className='module-input-text'/>
                        <ShowPasswordButton setShowPassword={setIsHiddenPassword} showPassword={isHiddenPassword} />
                    </div>
                    {errors.newPassword && <p className='error-text'>{errors.newPassword}</p>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='confirmPassword' className='input-label'>Powtórz nowe hasło</label>
                    <div className='relative'>
                        <input onChange={handleChange} id='confirmPassword' name='confirmPassword' type={`${isHiddenRepeatPassword ? 'password' : 'text'}`} value={userDetails.confirmPassword} className='module-input-text'/>
                        <ShowPasswordButton setShowPassword={setIsHiddenRepeatPassword} showPassword={isHiddenRepeatPassword} />
                    </div>
                    {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword}</p>}
                </div>
            </div>
            {errors.submit && <p className='error-text'>{errors.submit}</p>}
            {error && <p className='error-text'>{error}</p>}
            <SubmitButton loading={loading} title="Zmień hasło" />
            </form>
        </div>
    </div>
</div>
  )
}

export default ChangePassword

