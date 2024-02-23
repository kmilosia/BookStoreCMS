import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/buttons/CloseWindowButton'
import { getValidToken } from '../api/getValidToken'
import axiosClient from '../api/apiClient'

function ShowTemplateFields({setFieldsModal}) {
    const [data, setData] = useState(null)
    useEffect(() => {
        getAllData()
    },[])
    const getAllData = async () => {
        try{
          const token = getValidToken()
          if(token){  
            const response = await axiosClient.get(`/Admin/Invoice/Fields`,{
              headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
            }})
            if(response.status === 200 || response.status === 204){
              setData(response.data)
            }}
        }catch(err){
            console.log(err);
        }
      }
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dostępne pola do szablonu dokumentu</h1>
              <CloseWindowButton handleCloseModule={() => setFieldsModal(false)} />
            </div>
            <div className='flex flex-row flex-wrap cursor-default'>
                {data?.map((item,index) => {
                    return(
                        <div key={index} className='px-3 py-2 flex flex-col rounded-md my-1 mx-1 border-2 border-gray-300 dark:border-dracula-600 dark:text-white'>
                            <p className='text-xs'>{item.description}</p>
                            <p className='text-sm font-medium mt-1'>{item.field}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    </div>
  )
}

export default ShowTemplateFields
