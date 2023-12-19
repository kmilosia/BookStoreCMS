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
      <div className='fixed top-0 left-0 h-max w-screen grid grid-cols-[auto_max-content] bg-green-500 text-white py-5 px-5 shadow-md z-[10000]'>
        <div className='w-full flex justify-center items-center cursor-default'>
            <h1 className='font-medium'>{alertTitle}</h1>
        </div>
        <button className='flex justify-end' onClick={() => dispatch(hideAlert())}><AiOutlineClose className='text-xl transition-all text-white hover:text-gray-100 dark:hover:text-gray-100'/></button>
      </div>
    )
  );
};

export default Alert;
