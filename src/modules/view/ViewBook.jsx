import React, { useEffect, useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import TitledImage from '../../components/TitledImage'

function ViewBook(props) {
    const [book, setBook] = useState({})
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/Book/${id}`)
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
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
                <div className='module-header-row'>
                    <h1 className='module-header'>{book.title}</h1>
                    <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>
                <div className='info-grid'>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Tytuł</p>
                        <h2 className='column-info-text'>{book.title}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Język oryginalny</p>
                        <h2 className='column-info-text'>{book.originalLanguageName}</h2>
                    </div>
                    <div className='flex flex-col'>
                        <p className='column-info-title'>Wydawnictwo</p>
                        <h2 className='column-info-text'>{book.publisherName}</h2>
                    </div>
                </div>              
                <div className='divider'></div>           
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Opis</p>
                    <h2 className='column-info-text break-all'>{book.description}</h2>
                </div>    
                <div className='divider'></div>
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Kategorie</p>
                    <div className='flex flex-row my-1'>
                    {book.categories && book.categories.map(item => (
                        <div key={item.id} className='info-button'>
                            <h2 className='text-sm'>{item.name}</h2>
                        </div>
                    ))}
                </div> 
                </div> 
                <div className='flex flex-col my-1'>
                    <p className='column-info-title'>Autorzy</p>
                    <div className='flex flex-row my-1'>
                    {book.authors && book.authors.map(item => (
                        <div key={item.id} className='info-button'>
                         <h2 className='text-sm'>{item.name} {item.surname}</h2>
                        </div>
                    ))}
                </div>                         
                </div>  
                <div className='divider'></div>
                <div className='flex flex-col my-1'>
                <p className='column-info-title'>Zdjęcia</p>
                {book.images &&
                <div className='info-grid'>
                    {book.images && book.images.map(item => (
                        <TitledImage imageURL={item.imageURL} title={item.title}/>
                    ))}
                </div>
                }                
                </div>         
                       
            </div>
        </div>
    </div>
  )
}

export default ViewBook
