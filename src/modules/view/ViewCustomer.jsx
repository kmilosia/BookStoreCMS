import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import TitledImage from '../../components/TitledImage'

function ViewCustomer(props) {
    const [customer, setCustomer] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Customer/${id}`)
          setCustomer(response.data)
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
                    <h1 className='module-header'>{customer.name} {customer.surname}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>         
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Imię</p>
                        <h2 className='column-info-text break-all'>{customer.name}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Nazwisko</p>
                        <h2 className='column-info-text break-all'>{customer.surname}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Płeć</p>
                        <h2 className='column-info-text break-all'>{customer.genderName}</h2>
                    </div>
                </div>              
                <div className='divider'></div>           
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Data urodzenia</p>
                        <h2 className='column-info-text break-all'>{customer.dateOfBirth}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Numer telefonu</p>
                        <h2 className='column-info-text break-all'>{customer.phoneNumber}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Subskrybcja</p>
                        <h2 className='column-info-text'>{customer.isSubscribed ? "Tak" : "Nie"}</h2>
                    </div>
                </div>    
                <div className='divider'></div>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Adresy klienta</p>
                    <div className='grid grid-cols-5 gap-2'>
                      <p>Ulica</p>
                      <p>Numer domu</p>
                      <p>Kod pocztowy</p>
                      <p>Miasto</p>
                      <p>Kraj</p>
                    </div>
                    {customer.listOfCustomerAdresses && customer.listOfCustomerAdresses.map(item => (             
                      <div className='grid grid-cols-5 gap-2'>
                        <p>{item.street} {item.streetNumber}</p>
                        <p>{item.houseNumber}</p>
                        <p>{item.postcode}</p>
                        <p>{item.cityName}</p>
                        <p>{item.countryName}</p>
                      </div>    
                    ))}
                </div>                                                           
            </div>
        </div>
    </div>
  )
}

export default ViewCustomer
