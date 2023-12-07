import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { useDispatch } from 'react-redux'
import {showAlert} from '../../store/alertSlice'
import { convertDateToInput } from '../../utils/functions/convertDate'

function EditNewsletter(props) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [publicationDate, setPublicationDate] = useState('')
    const [content, setContent] = useState('')
    const [newsletter,setNewsletter] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Newsletter/${id}`)
          setNewsletter(response.data)
          setTitle(response.data.title)
          const newDate = new Date(response.data.publicationDate)
          setPublicationDate(convertDateToInput(newDate))
          setContent(response.data.content)
        }catch(err){
          console.error(err)
        }
    }
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handlePublicationDate = (e) => {
        setPublicationDate(e.target.value)
    }
    const handleContent = (e) => {
        setContent(e.target.value)
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
        newsletter.title = title
        newsletter.publicationDate = publicationDate
        newsletter.content = content
        props.putData(newsletter.id, newsletter)
        props.setEditedID(null)
        props.setShowEditModule(false)
        dispatch(showAlert({ title: 'Newsletter został edytowany!' }));
  }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj newsletter</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleTitle} value={title} type='text' placeholder='Tytuł' title='Tytuł newslettera'/>
                    <DefaultInput onChange={handlePublicationDate} value={publicationDate} type='date' placeholder='Data publikacji' title='Data publikacji'/>
                </div>
                <DefaultTextarea onChange={handleContent} value={content} placeholder='Treść' title="Treść newslettera"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditNewsletter
