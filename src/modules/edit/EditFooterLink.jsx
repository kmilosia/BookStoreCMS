import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import Select from 'react-select'

function EditFooterLink(props) {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [path, setPath] = useState('')
  const [url, setUrl] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [columns, setColumns] = useState([])
  const [columnId, setColumnId] = useState(null)
  const [link, setLink] = useState({})

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
    const getItem = async (id) => {
        try{
          const response = await axiosClient.get(`/FooterLinks/${id}`)
          setLink(response.data)
          setName(response.data.name)
          setPosition(response.data.position)
          setPath(response.data.path)
          setUrl(response.data.url)
          setColumnId(response.data.footerColumnID)
          
        }catch(err){
          console.error(err)
        }
    }
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
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSelectChange = (selectedOption) => {
      if (selectedOption) {
          setSelectedOption(selectedOption)
          setColumnId(selectedOption.value)
      } else {
          setSelectedOption(null)
          setColumnId(null)
      }
    }
    const handleAcceptButton = () => {
      const data = {
          id: link.id,
          name: name,
          path: path,
          url: url,
          position: position,
          footerColumnID: columnId
      }
      props.putData(link.id,data)
      handleCloseModule()
  } 
  useEffect(() => {
    const fetchAllData = async () => {
      await getFooterColumns();
      await getItem(props.editedID);
    };
    fetchAllData();
  }, []);
  
  useEffect(() => {
    const selected = columns.find((col) => col.value === columnId);
    if (selected) {
      setSelectedOption(selected);
    }
  }, [columns, columnId]);
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
        <div className='module-window'>
            <div className='module-content-wrapper'>
            <div className='module-header-row'>
                  <h1 className='module-header'>Edytuj link footera</h1>
                  <CloseWindowButton handleCloseModule={handleCloseModule} />
                </div>                
                <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
                <input onChange={handlePositionInput} type='text' value={position} className='module-input-text'/>
                <input onChange={handlePathInput} type='text' value={path} className='module-input-text'/>
                <input onChange={handleUrlInput} type='text' value={url} className='module-input-text'/>
                <Select onChange={handleSelectChange} maxMenuHeight={100} value={selectedOption} options={columns} isClearable={true} isSearchable={true} className="my-react-select-module-container my-2 w-full" classNamePrefix="my-react-select-module" placeholder='Kolumna'/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditFooterLink
