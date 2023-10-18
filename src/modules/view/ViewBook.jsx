import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'

function ViewBook(props) {
    const [book, setBook] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Book/full-details/${id}`)
          setBook(response.data)
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
        console.log(book);
    },[book])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper dark:text-gray-100'>
                <h1 className='module-header'>Informacje o książce</h1>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Tytuł:</p>
                    <h2 className='mx-2'>{book.title}</h2>
                </div>
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Opis:</p>
                    <h2 className='mx-2'>{book.description}</h2>
                </div>   
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Język Oryginalny:</p>
                    <h2 className='mx-2'>{book.originalLanguageName}</h2>
                </div> 
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Wydawnictwo:</p>
                    <h2 className='mx-2'>{book.publisherName}</h2>
                </div> 
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Kategorie:</p>
                </div> 
                <div className='flex flex-row my-1'>
                    <p className='font-semibold'>Autorzy:</p>
                </div>                         
            </div>
        </div>
    </div>
  )
}

export default ViewBook
