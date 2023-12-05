import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import {showAlert} from '../../store/alertSlice'

function EditNavbarLink(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [path, setPath] = useState('')
    const [position, setPosition] = useState('')
    const [link,setLink] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/NavBarMenuLinks/${id}`)
          setLink(response.data)
          setName(response.data.name)
          setPath(response.data.path)
          setPosition(response.data.position)
        }catch(err){
          console.error(err)
        }
    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handlePath = (e) => {
        setPath(e.target.value)
    }
    const handlePosition = (e) => {
        setPosition(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        link.name = name
        link.path = path
        link.position = position
        props.putData(link.id, link)
        props.setEditedID(null)
        props.setShowEditModule(false)
        dispatch(showAlert({ title: 'Navbar link został edytowany!' }));
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj navbar link</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleName} value={name} type='text' placeholder='Nazwa' title='Nazwa linku'/>
                    <DefaultInput onChange={handlePath} value={path} type='text' placeholder='Ścieżka' title='Ścieżka linku'/>
                    <DefaultInput onChange={handlePosition} value={position} type='number' placeholder='Pozycja' title='Pozycja linku'/>
                </div>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditNavbarLink
