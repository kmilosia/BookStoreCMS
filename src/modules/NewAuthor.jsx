import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../styles'
import CloseWindowButton from '../components/CloseWindowButton'

function NewAuthor({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [description, setDescription] = useState('')
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleSurnameInput = (e) => {
        setSurname(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            surname: surname,
            description: description,
        }
        postData(data)
        handleCloseModule()
    } 
  return (
    <div className='absolute h-full w-full top-0 left-0 flex items-center justify-center' style={backgroundOverlayModule}>
        <div className='rounded-md bg-dracula-100 flex flex-col p-6 dark:bg-dracula-900 w-2/5'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='p-4 flex flex-col'>
                <h1 className='text-2xl font-semibold mb-2 text-dracula-900 dark:text-dracula-100'>Dodaj nowego autora</h1>
                <input onChange={handleNameInput} type='text' placeholder='Imię' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <input onChange={handleSurnameInput} type='text' placeholder='Nazwisko' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <textarea onChange={handleDescriptionInput} placeholder='Opis autora' rows={4} className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <button onClick={handleAcceptButton} className='bg-orange-500 w-[100%] rounded-md py-2 my-2 text-dracula-100 font-semibold transition-all hover:bg-orange-600'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewAuthor
