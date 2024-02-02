import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewAuthor({handleCloseModule,editedID}) {
    const [author, setAuthor] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Author/${id}`)
          if(response.status === 200 || response.status === 204){
            setAuthor(response.data)
          }
        }catch(e){
          console.log(e)
        }
    }
    useEffect(()=>{
        getItem(editedID)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{author?.name} {author?.surname}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Imię</p>
                    <h2 className='column-info-text'>{author?.name}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Nazwisko</p>
                    <h2 className='column-info-text'>{author?.surname}</h2>
                </div>
                </div>
                <div className='divider'></div>           
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Opis</p>
                    <h2 className='column-info-text'>{author?.description}</h2>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default ViewAuthor
