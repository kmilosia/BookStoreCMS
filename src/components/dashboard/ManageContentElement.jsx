import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function ManageContentElement(props) {
  const decodedToken = useAuthStore((state) => state.decodedToken)

  return (
    (decodedToken?.[props.attribute] && Array.isArray(decodedToken[props.attribute]) && decodedToken[props.attribute].includes('r')) ||
    (decodedToken?.[props.attribute] === 'r') ||
    (decodedToken?.Role === 'Admin' || (Array.isArray(decodedToken.Role) && decodedToken.Role.includes('Admin')))
    ) && (
    <Link to={props.path} className='flex w-full rounded-md bg-white dark:bg-dracula-700 p-10 shadow-sm hover:bg-gray-50 hover:dark:bg-dracula-800'>
    <div className='flex flex-col justify-center items-center w-full h-max'>
      <img src={props.imgURL} className='w-full h-auto object-contain' alt='Action of the element' />
      <div className='flex flex-col justify-center w-full text-dracula-700 dark:text-white text-center'>
        <h4 className='text-2xl font-semibold my-2'>{props.title}</h4>
        <h5>{props.content}</h5>
      </div>
    </div>
  </Link> 
  )
}

export default ManageContentElement
