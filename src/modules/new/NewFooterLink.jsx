import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import Select from 'react-select'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'


function NewFooterLink({setShowNewModule, postData}) {
    const getFooterColumns = async () => {
        try{
          const response = await axiosClient.get(`/FooterColumns`)
          const optionColumns = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setColumns(optionColumns)
        }catch(err){
          console.error(err)
        }
    }
    const [name, setName] = useState('')
    const [position, setPosition] = useState(null)
    const [path, setPath] = useState('')
    const [url, setUrl] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const [columns, setColumns] = useState([])
    const [columnId, setColumnId] = useState(null)
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handlePositionInput = (e) => {
        setPosition(e.target.value)
    }
    const handlePathInput = (e) => {
        setPath(e.target.value)
    }
    const handleUrlInput = (e) => {
        setUrl(e.target.value)
    }
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setSelectedOption(selectedOption);
            setColumnId(selectedOption.value); // Set the columnId state to the selected option's value
        } else {
            setSelectedOption(null);
            setColumnId(null); // Reset columnId if no option is selected
        }
    };
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const data = {
            name: name,
            path: path,
            url: url,
            position: position,
            footerColumnID: columnId
        }
        // console.log(selectedOption);
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        getFooterColumns()
    },[])
  return (
    <div className='absolute h-full w-full top-0 left-0 flex items-center justify-center' style={backgroundOverlayModule}>
        <div className='rounded-md bg-dracula-100 flex flex-col p-6 dark:bg-dracula-900 w-2/5'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='p-4 flex flex-col'>
                <h1 className='text-2xl font-semibold mb-2 text-dracula-900 dark:text-dracula-100'>Dodaj nowego translatora</h1>
                <input onChange={handleNameInput} type='text' placeholder='Nazwa' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <input onChange={handlePositionInput} type='number' placeholder='Pozycja' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <input onChange={handlePathInput} type='text' placeholder='Ścieżka' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <input onChange={handleUrlInput} type='text' placeholder='URL' className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <Select onChange={handleSelectChange} value={selectedOption} options={columns} isClearable={true} className="my-react-select-container mx-3 w-[300px]" classNamePrefix="my-react-select" placeholder='Wybierz opcję..'/>
                <button onClick={handleAcceptButton} className='bg-orange-500 w-[100%] rounded-md py-2 my-2 text-dracula-100 font-semibold transition-all hover:bg-orange-600'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterLink
