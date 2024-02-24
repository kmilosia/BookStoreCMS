import React, { useState } from 'react'
import { FaDownload,FaUpload } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import ShowTemplateFields from '../../modules/ShowTemplateFields';
import UploadTemplate from '../../modules/UploadTemplate';
import { getValidToken } from '../../api/getValidToken';
import axiosClient from '../../api/apiClient';
import ButtonSpinner from '../../components/ButtonSpinner';

function Templates() {
    const [fieldsModal, setFieldsModal] = useState(false)
    const [uploadModal, setUploadModal] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const button = 'default-button w-[400px] py-3 text-base'

    const downloadFile = async () => {
        setDownloadLoading(true)
        try {
            const token = getValidToken()
            const response = await axiosClient.get(`/Admin/Invoice/Download`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                responseType: 'arraybuffer',
            })
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'template.docx'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        } catch (error) {
            console.log(error)
        }
        setDownloadLoading(false)
    }
  return (
    <>
    <div className='main-wrapper'>
        <div className='flex flex-col min-h-[90vh]'>
        <h1 className='main-header'>Szablon dokumentów</h1>    
        <div className='flex flex-col h-full items-center justify-center'>
            <button onClick={() => {downloadFile()}} className={button}>
                {downloadLoading ? <ButtonSpinner /> :
                <><FaDownload className='mr-2'/>Pobierz aktualny szablon</>
                }
            </button>
            <button onClick={() => {setUploadModal(true)}} className={button}><FaUpload className='mr-2'/>Dodaj nowy szablon</button>
            <button onClick={() => {setFieldsModal(true)}} className={button}><FaEye className='mr-2'/>Pokaż dostępne pola dla szablonu</button>
        </div>
        </div>
    </div>
    {fieldsModal && <ShowTemplateFields setFieldsModal={setFieldsModal}/>}
    {uploadModal && <UploadTemplate setUploadModal={setUploadModal}/>}
    </>
  )
}

export default Templates
