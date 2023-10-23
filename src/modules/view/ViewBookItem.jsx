import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewBookItem(props) {
    const [item, setItem] = useState({})
    const [book, setBook] = useState({})
    const getBook = async (id) => {
        try{
          const response = await axiosClient.get(`/Book/${id}`)
          setBook(response.data)
        }catch(err){
          console.error(err)
        }
    }
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/BookItems/${id}`)
          setItem(response.data)
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
      if (item.bookId) {
        getBook(item.bookId);
      }
    }, [item]);
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
                <h1 className='module-header'>{book.title}</h1>
                <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>  
            <div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Tytuł</p>
                        <h2 className='column-info-text'>{book.title}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Ilość stron</p>
                        <h2 className='column-info-text'>{item.pages}</h2>
                    </div>
                </div>              
        </div>
    </div>
</div>
  )
}

export default ViewBookItem
