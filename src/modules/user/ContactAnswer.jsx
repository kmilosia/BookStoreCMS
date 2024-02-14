import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultTextarea from '../../components/forms/DefaultTextarea'
import { useMessageStore } from '../../store/messageStore'
import axiosClient from '../../api/apiClient'
import { getValidToken } from '../../api/getValidToken'

function ContactAnswer({setShowModule,setItemId,itemId}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState(null)
    const [content, setContent] = useState('')
    const handleAcceptButton = () => {
        if(content === ''){
            setErrors('Wpisz wiadomość')
        }else{
            setErrors(null)
            postData(itemId, content)
            setItemId(null)
            handleCloseModule()
        }
    } 
    const postData = async (id, content) => {
        try{
          const token = getValidToken()
          if(token){    
            const response = await axiosClient.post(`/Contact/${id}?content=${content}`,{
              headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
            }})
            if(response.status === 200 || response.status === 204){
              setMessage({title: "Wiadomość została wysłana", type: 'success'})
            }else{
              setMessage({title: "Błąd podczas wysyłania wiadomości", type: 'error'})
            }}
        }catch(err){
            setMessage({title: "Błąd podczas wysyłania wiadomości", type: 'error'})
        }
      }
    const handleCloseModule = () => {
        setShowModule(false)
    }   
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row mb-0'>
                  <h1 className='module-header'>Odpowiedz na wiadomość</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <DefaultTextarea error={errors} name="content" onChange={e => setContent(e.target.value)} placeholder='Wiadomość'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default ContactAnswer
