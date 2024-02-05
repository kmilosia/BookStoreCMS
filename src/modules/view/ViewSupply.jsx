import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import { formatDisplayDate } from '../../utils/functions/formatDisplayDate'
import { BsDot } from 'react-icons/bs'

function ViewSupply(props) {
    const [data, setData] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Supply/${id}`)
          if(response.status === 200 || response.status === 204){
            setData(response.data)
          }
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
            <div className='module-content-wrapper cursor-default dark:text-white'>
                <div className='module-header-row'>
                    <h1 className='module-header'>Dostawa od {data?.supplierData?.name} #{data?.id}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>    
                <div className='rounded-md border-gray-200 dark:border-dracula-700 border-2 mb-3'>
                    <div className='p-3 bg-gray-200 dark:bg-dracula-700'>
                        <p className='text-base font-semibold'>Dane dostawcy</p>
                    </div>
                    <div className='grid grid-cols-3 gap-2 p-3 text-sm'>
                        <div className='flex flex-row'>
                            <p>Nazwa dostawcy: </p>
                            <p className='font-medium ml-2'>{data?.supplierData?.name}</p>
                        </div>
                        <div className='flex flex-row justify-center'>
                            <p>Email: </p>
                            <p className='font-medium ml-2'>{data?.supplierData?.email}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Telefon: </p>
                            <p className='font-medium ml-2'>{data?.supplierData?.phoneNumber}</p>
                        </div>
                        <div className='flex flex-row col-span-3'>
                            <p>Adres: </p>
                            <p className='font-medium ml-2'>
                                {data?.supplierData?.supplierAddress?.street + " " + data?.supplierData?.supplierAddress?.streetNumber + "/" +data?.supplierData?.supplierAddress?.houseNumber
                                + " , " +data?.supplierData?.supplierAddress?.postcode + " " + data?.supplierData?.supplierAddress?.cityName + " , " + data?.supplierData?.supplierAddress?.countryName}
                            </p>
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
                            <p className='font-medium ml-2'>{data?.paymentData?.transactionStatus?.name}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Metoda płatności: </p>
                            <p className='font-medium ml-2'>{data?.paymentData?.paymentMethod?.name}</p>
                        </div>
                        <div className='flex flex-row'>
                            <p>Data płatności: </p>
                            <p className='font-medium ml-2'>{data?.paymentData?.paymentDate && formatDisplayDate(data?.paymentData?.paymentDate)}</p>
                        </div>
                        <div className='flex flex-row justify-end'>
                            <p>Kwota: </p>
                            <p className='font-medium ml-2'>{data?.paymentData?.amount?.toFixed(2)}zł</p>
                        </div>
                    </div>                    
                </div>   
                <div className='rounded-md border-gray-200 dark:border-dracula-700 border-2 mb-3'>
                    <div className='p-3 bg-gray-200 dark:bg-dracula-700'>
                        <p className='text-base font-semibold'>Produkty</p>
                    </div>
                    <div className='flex flex-col p-3'>
                        {data?.supplyBooksData?.map((item,index) => {
                            return(
                                <div key={index} className={`flex flex-row items-center justify-between ${index > 0 && 'mt-2'}`}>
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
                                        <div className='flex flex-row mt-1'>
                                            <p>Cena brutto: </p>
                                            <p className='ml-2 font-medium'>{item.bruttoPrice?.toFixed(2)}zł</p>
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

export default ViewSupply
