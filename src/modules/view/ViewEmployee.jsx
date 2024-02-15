import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'

function ViewEmployee(props) {
    const [data, setData] = useState({})
    const handleCloseModule = () => {
        props.setEditedID(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        props.getItem(props.editedID,setData)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{data?.name} {data?.surname}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>  
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col my-1'>
                        <p className='column-info-title'>ID pracownika</p>
                        <h2 className='column-info-text'>{data?.id}</h2>
                    </div> 
                    <div className='flex flex-col my-1'>
                        <p className='column-info-title'>Imię pracownika</p>
                        <h2 className='column-info-text'>{data?.name} {data?.surname}</h2>
                    </div>             
                    <div className='flex flex-col my-1'>
                        <p className='column-info-title'>Nazwa użytkownika</p>
                        <h2 className='column-info-text'>{data?.username}</h2>
                    </div>   
                    <div className='flex flex-col my-1'>
                        <p className='column-info-title'>Email</p>
                        <h2 className='column-info-text'>{data?.email}</h2>
                    </div>  
                    <div className='flex flex-col my-1'>
                        <p className='column-info-title'>Numer telefonu</p>
                        <h2 className='column-info-text'>{data?.phoneNumber}</h2>
                    </div>  
                    <div className='flex flex-col my-1'>
                        <p className='column-info-title'>Rola</p>
                        <h2 className='column-info-text'>{data?.roleNames?.map((item, index) => {return(<span>{index > 0 && ' , '}{item}</span>)})}</h2>
                    </div>             
                </div>              
            </div>
        </div>
    </div>
  )
}

export default ViewEmployee
