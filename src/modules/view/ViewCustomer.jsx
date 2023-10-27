import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { convertDateToUserFormat } from '../../utils/convertDate'

function ViewCustomer(props) {
    const [customer, setCustomer] = useState({})
    const [birthday, setBirthday] = useState(null)
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
    useEffect(() => {
      if (customer.dateOfBirth) {
          const date = new Date(customer.dateOfBirth);
          setBirthday(date);
      }
  }, [customer.dateOfBirth]);
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
                        <h2 className='column-info-text'>{birthday ? convertDateToUserFormat(birthday) : ''}</h2>
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
                    <div className='rounded-sm border-[1px] border-dracula-300 dark:border-dracula-600 my-1'>
                    <div className='grid grid-cols-5 gap-2 px-3 py-3 text-dracula-600 dark:text-dracula-400 text-xs font-semibold bg-dracula-300 dark:bg-dracula-600 text-center'>
                      <p>Ulica</p>
                      <p>Numer domu</p>
                      <p>Kod pocztowy</p>
                      <p>Miasto</p>
                      <p>Kraj</p>
                    </div>
                    {customer.listOfCustomerAdresses && customer.listOfCustomerAdresses.map(item => (             
                      <div className='grid grid-cols-5 gap-2 text-dracula-600 dark:text-dracula-400 text-xs font-light px-3 py-3 border-b-[1px] border-dracula-300 dark:border-dracula-600 text-center'>
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
    </div>
  )
}

export default ViewCustomer
