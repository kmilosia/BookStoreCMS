import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'

function ViewNews(props) {
    const [news, setNews] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/News/${id}`)
          if(response.status === 200 || response.status === 204){
          setNews(response.data)
          }
        }catch(err){
          console.log(err)
        }
    }
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        getItem(props.editedID)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{news?.topic}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł</p>
                    <h2 className='column-info-text'>{news?.topic}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Autor</p>
                    <h2 className='column-info-text'>{news?.authorName}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Data dodania</p>
                    <h2 className='column-info-text'>{news?.creationDate && formatDisplayDate(news.creationDate)}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Tytuł zdjęcia</p>
                    <h2 className='column-info-text'>{news?.imageTitle}</h2>
                </div>
                <div className='flex flex-col col-span-2'>
                    <p className='column-info-title'>Adres URL zdjęcia</p>
                    <h2 className='column-info-text break-words'>{news?.imageURL}</h2>
                </div>
                <div className='col-span-2 my-2'>
                    {news?.imageURL &&
                    <img src={news.imageURL} className='w-full h-auto object-contain' />
                    }
                </div>
                <div className='flex flex-col col-span-2'>
                    <p className='column-info-title'>Treść</p>
                    <h2 className='column-info-text'>{news?.content}</h2>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewNews
