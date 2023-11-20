import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewSupplier(props) {
    const [supplier, setSupplier] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Supplier/${id}`)
          setSupplier(response.data)
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
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                    <h1 className='module-header'>{supplier.name}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>         
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Nazwa</p>
                        <h2 className='column-info-text break-all'>{supplier.name}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Numer telefonu</p>
                        <h2 className='column-info-text break-all'>{supplier.phoneNumber}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Email</p>
                        <h2 className='column-info-text break-all'>{supplier.email}</h2>
                    </div>
                </div>                 
                <div className='divider'></div>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Adres dostawcy</p>
                    <div className='rounded-sm border-[1px] border-dracula-300 dark:border-dracula-600 my-1'>
                    <div className='grid grid-cols-5 gap-2 px-3 py-3 text-dracula-600 dark:text-dracula-400 text-xs font-semibold bg-dracula-300 dark:bg-dracula-600 text-center'>
                      <p>Ulica</p>
                      <p>Numer domu</p>
                      <p>Kod pocztowy</p>
                      <p>Miasto</p>
                      <p>Kraj</p>
                    </div>
                      <div className='grid grid-cols-5 gap-2 text-dracula-600 dark:text-dracula-400 text-xs font-light px-3 py-3 border-b-[1px] border-dracula-300 dark:border-dracula-600 text-center'>
                        <p>{supplier.address.street} {supplier.address.streetNumber}</p>
                        <p>{supplier.address.houseNumber}</p>
                        <p>{supplier.address.postcode}</p>
                        <p>{supplier.address.cityName}</p>
                        <p>{supplier.address.countryName}</p>
                      </div>    
                    </div>
                </div>                                                           
            </div>
        </div>
    </div>
  )
}

export default ViewSupplier