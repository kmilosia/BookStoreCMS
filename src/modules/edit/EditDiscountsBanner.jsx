import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import { discountsBannerValidate } from '../../utils/validation/newValidate'

function EditDiscountsBanner(props) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [banner,setBanner] = useState({
      header: '',
      buttonTitle: '',
      imageTitle: '',
      imageURL: '',      
    })
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/DiscountsBanner/${id}`)
          if(response.status === 200 || response.status === 204){
            setBanner(response.data)
          }
        }catch(err){
          console.log(err)
        }
    }
    const handleChange = (e) => {
      setBanner({ ...banner, [e.target.name]: e.target.value })
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleAcceptButton = () => {
      setSubmitting(true)
      setErrors(discountsBannerValidate(banner))
  } 
  useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
          props.putData(props.editedID,banner)
          handleCloseModule()
      }
    }, [errors])
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj baner promocyjny</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput error={errors.header} name="header" onChange={handleChange} value={banner.header} type='text' placeholder='Tytuł' title='Tytuł baneru'/>
                    <DefaultInput error={errors.buttonTitle} name="buttonTitle" onChange={handleChange} value={banner.buttonTitle} type='text' placeholder='Tytuł buttona' title='Tytuł buttona'/>
                    <DefaultInput error={errors.imageTitle} name="imageTitle" onChange={handleChange} value={banner.imageTitle} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia'/>
                    <DefaultInput error={errors.imageURL} name="imageURL" onChange={handleChange} value={banner.imageURL} type='text' placeholder='Adres zdjęcia' title='Adres URL zdjęcia'/>
                </div>
                {banner.imageURL &&
                <div className='w-full h-auto'>
                    <img src={banner.imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditDiscountsBanner
