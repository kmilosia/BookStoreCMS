import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewFooterColumn(props) {
    const [column, setColumn] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/FooterColumns/${id}`)
          setColumn(response.data)
        }catch(err){
          console.error(err)
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
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Informacje o kolumnie w footerze</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Nazwa:</p>
                    <h2 className='mx-2'>{column.name}</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Pozycja:</p>
                    <h2 className='mx-2'>{column.position}</h2>
                </div>  
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>HTML Tag:</p>
                    <h2 className='mx-2'>{column.htmlObject}</h2>
                </div>               
            </div>
        </div>
    </div>
  )
}

export default ViewFooterColumn
