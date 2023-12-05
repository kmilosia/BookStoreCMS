import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import {showAlert} from '../../store/alertSlice'

function EditDiscountsBanner(props) {
    const dispatch = useDispatch()
    const [header, setHeader] = useState('')
    const [buttonTitle, setButtonTitle] = useState('')
    const [imageTitle, setImageTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [banner,setBanner] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/DiscountsBanner/${id}`)
          setBanner(response.data)
          setHeader(response.data.header)
          setButtonTitle(response.data.buttonTitle)
          setImageTitle(response.data.imageTitle)
          setImageURL(response.data.imageURL)
        }catch(err){
          console.error(err)
        }
    }
    const handleHeader = (e) => {
        setHeader(e.target.value)
    }
    const handleButtonTitle = (e) => {
        setButtonTitle(e.target.value)
    }
    const handleImageURL = (e) => {
        setImageURL(e.target.value)
    }
    const handleImageTitle = (e) => {
        setImageTitle(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        banner.header = header
        banner.buttonTitle = buttonTitle
        banner.imageTitle = imageTitle
        banner.imageURL = imageURL
        props.putData(banner.id, banner)
        props.setEditedID(null)
        props.setShowEditModule(false)
        dispatch(showAlert({ title: 'Baner promocyjny został edytowany!' }));
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj baner promocyjny</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleHeader} value={header} type='text' placeholder='Tytuł' title='Tytuł baneru'/>
                    <DefaultInput onChange={handleButtonTitle} value={buttonTitle} type='text' placeholder='Tytuł buttona' title='Tytuł buttona'/>
                    <DefaultInput onChange={handleImageTitle} value={imageTitle} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia'/>
                    <DefaultInput onChange={handleImageURL} value={imageURL} type='text' placeholder='Adres zdjęcia' title='Adres URL zdjęcia'/>
                </div>
                {imageURL &&
                <div className='w-full h-auto'>
                    <img src={imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscountsBanner
