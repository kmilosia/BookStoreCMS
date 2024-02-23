import React, { useState } from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/buttons/CloseWindowButton'
import { useMessageStore } from '../store/messageStore'
import { getValidToken } from '../api/getValidToken'
import axiosClient from '../api/apiClient'
import ButtonSpinner from '../components/ButtonSpinner'

function UploadTemplate({setUploadModal}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleFileChange = (e) => {
      if (e.target.files) {
        setFile(e.target.files[0])
      }
    }
    const handleUpload = async () => {
        setLoading(true)
        if(file){
            if(error){setError(null)}
            const formData = new FormData()
            formData.append("file", file)  
            try{
                const token = getValidToken()
                if(token){  
                  const response = await axiosClient.post(`/Admin/Invoice/Upload`, formData,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        "content-type": "multipart/form-data",
                  }})
                  if(response.status === 200 || response.status === 204){
                    setMessage({title: "Dokument został dodany", type: 'success'})
                    setUploadModal(false)
                  }else{
                    setError("Błąd podczas wgrywania pliku!")
                  }}
                }catch(e){
                    setError("Błąd podczas próby wgrania pliku!")
              }
        }else{
            setError("Wgraj plik!")
        }
        setLoading(false)
    }

  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nowy szablon dokumentu</h1>
              <CloseWindowButton handleCloseModule={() => setUploadModal(false)} />
            </div>
            <div className='flex flex-col my-2 w-max'>
                <label htmlFor="file" className="sr-only">Wybierz plik</label>
                <input id="file" type="file" onChange={handleFileChange} placeholder='Wgraj plik'/>
            </div>
            <button onClick={handleUpload} className='module-button flex items-center justify-center w-[200px]'>{loading ? <ButtonSpinner /> : 'Dodaj'}</button>
            {error && <p className='error-text'>{error}</p>}
        </div>
        </div>
    </div>
  )
}

export default UploadTemplate
