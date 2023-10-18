import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'

function NewImage({setShowNewModule, postData}) {
    const [imageURL, setImageURL] = useState('')
    const [displayImg, setDisplayImg] = useState(false)
    const handleURLInput = (e) => {
        setImageURL(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAddButton = () => {
        setDisplayImg(true)
    }
    const handleAcceptButton = () => {
        const data = {
            imageURL: imageURL
        }
        postData(data)
        handleCloseModule()
    } 
    // useEffect(() => {

    // },[imageURL])
  return (
    <div className='absolute h-full w-full top-0 left-0 flex items-center justify-center' style={backgroundOverlayModule}>
        <div className='rounded-md bg-dracula-100 flex flex-col p-6 dark:bg-dracula-900 w-2/5'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='p-4 flex flex-col'>
                <h1 className='text-2xl font-semibold mb-2 text-dracula-900 dark:text-dracula-100'>Dodaj nowe zdjęcie</h1>
                {displayImg && <img src={imageURL} className='w-full object-contain h-auto my-1' />}
                <input onChange={handleURLInput} type='text' placeholder='URL' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <button onClick={handleAddButton} className='bg-orange-500 w-[100%] rounded-md py-2 my-2 text-dracula-100 font-semibold transition-all hover:bg-orange-600'>Dodaj zdjęcie</button>
                <button onClick={handleAcceptButton} className='bg-orange-500 w-[100%] rounded-md py-2 my-2 text-dracula-100 font-semibold transition-all hover:bg-orange-600'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewImage
