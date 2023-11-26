import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../store/alertSlice';
import { AiOutlineClose } from 'react-icons/ai';

const Alert = () => {
  const { showAlert, alertTitle } = useSelector((state) => state.alert);
  const dispatch = useDispatch()

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }
  }, [showAlert, dispatch]);

  return (
    showAlert && (
      <div className='fixed top-0 left-0 h-max w-screen grid grid-cols-[auto_max-content] py-5 bg-white dark:bg-dracula-800 px-5 shadow-md z-[10000]'>
        <div className='w-full flex justify-center items-center cursor-default'>
            <h1 className='font-medium text-midnight-900 dark:text-white'>{alertTitle}</h1>
        </div>
        <button className='flex justify-end' onClick={() => dispatch(hideAlert())}><AiOutlineClose className='text-xl transition-all text-dracula-500 hover:text-dracula-600 dark:hover:text-dracula-400'/></button>
      </div>
    )
  );
};

export default Alert;
