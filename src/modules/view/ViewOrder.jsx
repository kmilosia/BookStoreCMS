import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'
import { BsDot } from 'react-icons/bs'

function ViewOrder(props) {
    const [order, setOrder] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Order/${id}`)
          if(response.status === 200 || response.status === 204){
          setOrder(response.data)
          }
        }catch(err){
          console.log(err)
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
            <div className='module-content-wrapper text-black dark:text-white'>
            <div className='module-header-row'>
                    <h1 className='module-header'>Zamówienie #{order?.id}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>  
                <div className='rounded-md border-gray-200 dark:border-dracula-700 border-2 mb-3'>
                    <div className='p-3 bg-gray-200 dark:bg-dracula-700'>
                        <p className='text-base font-semibold'>Dane klienta</p>
                    </div>
                    <div className='grid grid-cols-2 gap-2 p-3 text-sm'>
                        <div className='flex flex-row'>
                            <p>Imię klienta: </p>
                            <p className='font-medium ml-2'>{order?.customer?.name} {order?.customer?.surname}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Email: </p>
                            <p className='font-medium ml-2'>{order?.customer?.email}</p>
                        </div>
                    </div>                    
                </div>  
                <div className='rounded-md border-gray-200 dark:border-dracula-700 border-2 mb-3'>
                    <div className='p-3 bg-gray-200 dark:bg-dracula-700'>
                        <p className='text-base font-semibold'>Dane płatności</p>
                    </div>
                    <div className='grid grid-cols-2 gap-2 p-3 text-sm'>
                        <div className='flex flex-row'>
                            <p>Status transakcji: </p>
                            <p className='font-medium ml-2'>{order?.payment?.transactionStatus?.name}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Metoda płatności: </p>
                            <p className='font-medium ml-2'>{order?.payment?.paymentMethod?.name}</p>
                        </div>
                        <div className='flex flex-row'>
                            <p>Data płatności: </p>
                            <p className='font-medium ml-2'>{order?.payment?.paymentDate && formatDisplayDate(order?.payment?.paymentDate)}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Kwota: </p>
                            <p className='font-medium ml-2'>{order?.payment?.amount?.toFixed(2)}PLN</p>
                        </div>
                    </div>                    
                </div>   
                <div className='rounded-md border-gray-200 dark:border-dracula-700 border-2 mb-3'>
                    <div className='p-3 bg-gray-200 dark:bg-dracula-700'>
                        <p className='text-base font-semibold'>Dane zamówienia</p>
                    </div>
                    <div className='grid grid-cols-2 gap-2 p-3 text-sm'>
                        <div className='flex flex-row'>
                            <p>Status zamówienia: </p>
                            <p className='font-medium ml-2'>{order?.orderStatus?.name}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Data zamówienia: </p>
                            <p className='font-medium ml-2'>{order?.orderDate && formatDisplayDate(order?.orderDate)}</p>
                        </div>
                        <div className='flex flex-row'>
                            <p>Sposób dostawy: </p>
                            <p className='font-medium ml-2'>{order?.deliveryMethod?.name}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Cena dostawy: </p>
                            <p className='font-medium ml-2'>{order?.deliveryMethod?.price?.toFixed(2)}PLN</p>
                        </div>
                        <div className='flex flex-row col-span-2 justify-end'>
                            <p>Kwota: </p>
                            <p className='font-medium ml-2'>{order?.totalBruttoPrice?.toFixed(2)}PLN</p>
                        </div>
                    </div>                    
                </div>          
                <div className='rounded-md border-gray-200 dark:border-dracula-700 border-2 mb-3'>
                    <div className='p-3 bg-gray-200 dark:bg-dracula-700'>
                        <p className='text-base font-semibold'>Produkty</p>
                    </div>
                    <div className='flex flex-col p-3'>
                        {order?.orderItems?.map((item,index) => {
                            return(
                                <div key={index} className={`flex flex-row items-center justify-between ${index > 0 && 'mt-2 pt-2 border-t dark:border-dracula-600'}`}>
                                    <div className='flex flex-col'>
                                        <h1 className='font-semibold text-sm'>{item.bookTitle}</h1>
                                        <h2 className='font-light text-xs'>{item.authors?.map(author => {return(author.name + " " + author.surname + " ")})}</h2>
                                        <div className='flex flex-row items-center font-semibold text-xs mt-2'>
                                            <p>{item.formName}</p>
                                            <BsDot className='dark:text-white text-black'/>
                                            <p>{item.formName === 'Ebook' ? item.fileFormatName : item.editionName}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-xs items-end'>
                                        <div className='flex flex-row'>
                                            <p>Ilość: </p>
                                            <p className='ml-2 font-medium'>{item.quantity}</p>
                                        </div>
                                        <div className='flex flex-row'>
                                            <p>Cena brutto: </p>
                                            <p className='ml-2 font-medium'>{item.bruttoPrice?.toFixed(2)}zł</p>
                                        </div>
                                        <div className='flex flex-row mt-2'>
                                            <p>Kwota całkowita: </p>
                                            <p className='ml-2 font-medium'>{item.totalBruttoPrice?.toFixed(2)}zł</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>      
            </div>
        </div>
    </div>
  )
}

export default ViewOrder
