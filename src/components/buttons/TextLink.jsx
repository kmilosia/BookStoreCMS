import React from 'react'
import { Link } from 'react-router-dom'

function TextLink({title,path}) {
  return (
    <Link to={path} className='self-end my-2 text-sm font-semibold text-purple-500 hover:text-purple-700'>{title}</Link>
  )
}

export default TextLink
