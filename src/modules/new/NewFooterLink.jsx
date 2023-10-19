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
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        getFooterColumns()
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Dodaj nowy link footera</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <input onChange={handleNameInput} type='text' placeholder='Nazwa' className='module-input-text'/>
                <input onChange={handlePositionInput} type='text' placeholder='Pozycja' className='module-input-text'/>
                <input onChange={handlePathInput} type='text' placeholder='Ścieżka' className='module-input-text'/>
                <input onChange={handleUrlInput} type='text' placeholder='URL' className='module-input-text'/>
                <Select onChange={handleSelectChange} maxMenuHeight={100} value={selectedOption} options={columns} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Kolumna'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default NewFooterLink
