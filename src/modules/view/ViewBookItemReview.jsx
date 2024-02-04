import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewBookItemReview(props) {
    const [data, setData] = useState([])
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/BookItemReview?bookItemId=${id}`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }
        }catch(err){
          console.log(err)
        }
    }
    const handleCloseModule = () => {
        props.setEditedItem(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        getItem(props.editedItem.id)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>Ocena #{data?.id}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='column-info-title'>ID produktu</p>
                    <h2 className='column-info-text'>{data?.bookItemId}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='column-info-title'>Ocena</p>
                    <h2 className='column-info-text'>{data?.scoreId}</h2>
                </div>
                <div className='flex flex-col col-span-2'>
                    <p className='column-info-title'>Treść</p>
                    <h2 className='column-info-text'>{data?.content}</h2>
                </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewBookItemReview
