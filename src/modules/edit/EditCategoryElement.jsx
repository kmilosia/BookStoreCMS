import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import {showAlert} from '../../store/alertSlice'
import DefaultSelect from '../../components/forms/DefaultSelect'

function EditCategoryElement(props) {
    const dispatch = useDispatch()
    const [path, setPath] = useState('')
    const [logo, setLogo] = useState('')
    const [content, setContent] = useState('')
    const [position, setPosition] = useState('')
    const [imageTitle, setImageTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryID, setCategoryID] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [element,setElement] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/CategoryElements/${id}`)
          setElement(response.data)
          setPath(response.data.path)
          setLogo(response.data.logo)
          setContent(response.data.content)
          setPosition(response.data.position)
          setImageTitle(response.data.imageTitle)
          setImageURL(response.data.imageURL)
          setCategoryID(response.data.categoryID)
        }catch(err){
          console.error(err)
        }
    }
    const getCategories = async () => {
      try{
        const response = await axiosClient.get(`/Category`)
        const options = response.data.map(item => ({
          value: item.id,
          label: item.name
        }))
        setCategoryOptions(options)
      }catch(err){
        console.error(err)
      }
  }
  useEffect(() => {
      getCategories()
  },[])
    const handlePath = (e) => {
        setPath(e.target.value)
    }
    const handleContent = (e) => {
        setContent(e.target.value)
    }
    const handleLogo = (e) => {
        setLogo(e.target.value)
    }
    const handlePosition = (e) => {
        setPosition(e.target.value)
    }
    const handleImageTitle = (e) => {
      setImageTitle(e.target.value)
    }
    const handleImageURL = (e) => {
      setImageURL(e.target.value)
    }
    const handleSelect = (selectedCategory) => {
          setSelectedCategory(selectedCategory)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        element.path = path
        element.content = content
        element.logo = logo
        element.position = position
        element.imageTitle = imageTitle
        element.imageURL = imageURL
        element.categoryID = selectedCategory.value
        props.putData(element.id, element)
        props.setEditedID(null)
        props.setShowEditModule(false)
        dispatch(showAlert({ title: 'Element kategorii został edytowany!' }));
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj autora</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="path" value={path} onChange={handlePath} type='text' placeholder='Ścieżka' title='Ścieżka do kategorii'/>
                    <DefaultInput name="logo" value={logo} onChange={handleLogo} type='text' placeholder='Logo' title='Logo kategorii'/>
                    {logo &&
                    <div className='w-1/3 h-auto my-2 col-span-2'>
                        <img src={logo} className='h-auto w-full object-contain' />
                    </div>
                    }
                    <DefaultInput name="position" value={position} onChange={handlePosition} type='number' placeholder='Pozycja' title='Pozycja'/>
                    <DefaultSelect name='selectedCategory' value={selectedCategory} onChange={handleSelect} options={categoryOptions} title='Kategoria' placeholder='Kategoria'/>
                    <DefaultInput name="imageURL" value={imageURL} onChange={handleImageURL} type='text' placeholder='URL zdjęcia' title='Adres URL zdjęcia'/>
                    <DefaultInput name="imageTitle" value={imageTitle} onChange={handleImageTitle} type='text' placeholder='Tytuł' title='Tytuł zdjęcia'/>
                    {imageURL &&
                    <div className='w-1/3 h-auto my-2 col-span-2'>
                        <img src={imageURL} className='h-auto w-full object-contain' />
                    </div>
                    }
                </div>
                
                <DefaultTextarea name="content" onChange={handleContent} placeholder='Treść' title="Treść kategorii"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditCategoryElement
