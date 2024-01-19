import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import DefaultInput from '../../components/forms/DefaultInput'
import { useMessageStore } from '../../store/messageStore'

function EditNews(props) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [topic, setTopic] = useState('')
    const [content, setContent] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [imageTitle, setImageTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [news,setNews] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/News/${id}`)
          setNews(response.data)
          setTopic(response.data.topic)
          setContent(response.data.content)
          setAuthorName(response.data.authorName)
          setImageTitle(response.data.imageTitle)
          setImageURL(response.data.imageURL)
        }catch(err){
          console.error(err)
        }
    }
    const handleTopic = (e) => {
        setTopic(e.target.value)
    }
    const handleAuthorName = (e) => {
        setAuthorName(e.target.value)
    }
    const handleContent = (e) => {
        setContent(e.target.value)
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
        news.topic = topic
        news.authorName = authorName
        news.content = content
        news.imageTitle = imageTitle
        news.imageURL = imageURL
        props.putData(news.id, news)
        props.setEditedID(null)
        props.setShowEditModule(false)
        setMessage({title: "Wiadomość została edytowana", type: 'success'})
      }
  useEffect(()=> {
    getItem(props.editedID)
  },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj wiadomość</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DefaultInput onChange={handleTopic} value={topic} type='text' placeholder='Tytuł' title='Tytuł wiadomośći'/>
                    <DefaultInput onChange={handleAuthorName} value={authorName} type='text' placeholder='Autor' title='Autor wiadomości'/>
                    <DefaultInput onChange={handleImageTitle} value={imageTitle} type='text' placeholder='Tytuł zdjęcia' title='Tytuł zdjęcia'/>
                    <DefaultInput onChange={handleImageURL} value={imageURL} type='text' placeholder='Adres zdjęcia' title='Adres URL zdjęcia'/>
                </div>
                {imageURL &&
                <div className='w-full h-auto my-2'>
                    <img src={imageURL} className='w-full h-auto object-contain' />
                </div>
                }
                <DefaultTextarea name="content" onChange={handleContent} value={content} placeholder='Treść' title="Treść wiadomości"/>
                <button onClick={handleSaveClick} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditNews
