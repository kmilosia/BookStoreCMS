import React from 'react'
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

function SideLink({attribute, title, path, handleLinkClick}) {
    const decodedToken = useAuthStore((state) => state.decodedToken)
    
  return (
    (decodedToken?.[attribute]?.includes('r') || decodedToken?.role === 'Admin') && 
    <Link to={path} onClick={handleLinkClick} className='sidemenu-link'>{title}</Link>
)
}

export default SideLink