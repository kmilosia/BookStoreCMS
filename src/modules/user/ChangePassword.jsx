import React from 'react'
import { useState } from 'react'
import CloseWindowButton from '../../components/buttons/CloseWindowButton';
import ShowPasswordButton from '../../components/buttons/ShowPasswordButton';
import ButtonSpinner from '../../components/ButtonSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { backgroundOverlayModule } from '../../styles';

function ChangePassword({setIsPasswordModule}) {
    const dispatch = useDispatch()
    const {userData,loading,error,success} = useSelector((state) => state.user)
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
    const handleSaveClick = () => {
        const data = {
            oldPassword: userDetails.oldPassword,
            newPassword: userDetails.newPassword,
            repeatNewPassword: userDetails.confirmPassword
        }
        console.log(data);
        setIsPasswordModule(false)

    }
    const handleClose = () => {
        setIsPasswordModule(false)
    }
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window w-[40rem]'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Zmień hasło</h1>
              <CloseWindowButton handleCloseModule={handleClose} />
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor='oldPassword' className='input-label'>Stare hasło</label>
                    <div className='relative'>
                        <input onChange={handleChange} id='oldPassword' name='oldPassword' type={`${isHiddenOldPassword ? 'password' : 'text'}`} value={userDetails.oldPassword} className='module-input-text'/>
                        <ShowPasswordButton setIsHiddenPassword={setIsHiddenOldPassword} isHiddenPassword={isHiddenOldPassword} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='newPassword' className='input-label'>Nowe hasło</label>
                    <div className='relative'>
                        <input onChange={handleChange} id='newPassword' name='newPassword' type={`${isHiddenPassword ? 'password' : 'text'}`} value={userDetails.newPassword} className='module-input-text'/>
                        <ShowPasswordButton setIsHiddenPassword={setIsHiddenPassword} isHiddenPassword={isHiddenPassword} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='confirmPassword' className='input-label'>Powtórz nowe hasło</label>
                    <div className='relative'>
                        <input onChange={handleChange} id='confirmPassword' name='confirmPassword' type={`${isHiddenRepeatPassword ? 'password' : 'text'}`} value={userDetails.confirmPassword} className='module-input-text'/>
                        <ShowPasswordButton setIsHiddenPassword={setIsHiddenRepeatPassword} isHiddenPassword={isHiddenRepeatPassword} />
                    </div>
                </div>
            </div>
            <button onClick={handleSaveClick} className='default-button flex items-center justify-center'>{loading ? <ButtonSpinner size={6}/> : <span>Zmień hasło</span> }</button>
        </div>
    </div>
</div>
  )
}

export default ChangePassword

