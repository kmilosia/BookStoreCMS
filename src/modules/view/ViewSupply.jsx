import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'

function ViewSupply(props) {
    const [data, setData] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Supply/${id}`)
          setData(response.data)
        }catch(e){
          console.log(e)
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
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                    <h1 className='module-header'>Dostawa z dnia {data?.supplyDate && formatDisplayDate(data.supplyDate)}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>         
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Nazwa dostawcy</p>
                        <h2 className='column-info-text break-all'>{data?.supplierName}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Data dostawy</p>
                        <h2 className='column-info-text break-all'>{data?.supplyDate && formatDisplayDate(data.supplyDate)}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Kwota</p>
                        <h2 className='column-info-text break-all'>{data?.priceBrutto}zł</h2>
                    </div>
                </div>                                                                        
            </div>
        </div>
    </div>
  )
}

export default ViewSupply
