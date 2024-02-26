import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import {formatDisplayDate} from '../../utils/functions/formatDisplayDate'

function ViewBookItemReview(props) {
    const [data, setData] = useState([])
    const handleCloseModule = () => {
        props.setEditedItem(null)
        props.setShowViewModule(false)
      }
    useEffect(()=>{
        props.getItem(props.editedItem.id,setData)
    },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                    <h1 className='module-header'>{props.editedItem?.bookTitle}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                {data?.map((item,index) => {
                    return(
                        <div key={index} className='flex flex-col rounded-md mb-3 border-2 border-gray-200 dark:border-dracula-700 dark:text-white'>
                            <div className='bg-gray-200 dark:bg-dracula-700 p-3'>
                                <h2 className='font-semibold'>Recenzja #{item.id}</h2>
                            </div>
                            <div className='grid grid-cols-3 gap-2 p-3 text-sm'>
                                <div className='flex flex-col'>
                                    <p className='font-light'>Użytkownik</p>
                                    <p className='font-semibold'>{item.customerName}</p>
                                </div>
                                <div className='flex flex-col w-max items-center'>
                                    <p className='font-light'>Ocena</p>
                                    <p className='font-semibold'>{item.scoreValue}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light'>Data dodania</p>
                                    <p className='font-semibold'>{item.creationDate && formatDisplayDate(item.creationDate)}</p>
                                </div>
                                {item.content !== '' &&
                                <div className='flex flex-col col-span-3 border-t dark:border-dracula-600 pt-2'>
                                    <p className='font-light'>Treść oceny</p>
                                    <p className='font-semibold'>{item.content}</p>
                                </div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ViewBookItemReview
