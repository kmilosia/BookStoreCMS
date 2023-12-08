import React, { useEffect } from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import axiosClient from '../../api/apiClient'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'

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
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput value={name} onChange={handleNameInput} type='text' placeholder='Nazwa' title="Nazwa linku"/>
                <DefaultInput value={position} onChange={handlePositionInput} type='number' placeholder='Pozycja' title="Pozycja linku w kolumnie"/>
                </div>
                <div className='grid grid-cols-[2fr_1fr] gap-2'>
                <DefaultInput value={path} onChange={handlePathInput} type='text' placeholder='Ścieżka' title="Ścieżka linku"/>
                <DefaultInput value={url} onChange={handleUrlInput} type='text' placeholder='URL' title="Adres URL linku"/>
                </div>
                <DefaultSelect onChange={handleSelectChange} value={selectedOption} options={columns} isMulti={false} placeholder='Kolumna' title="Kolumna footer'a"/>
                <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditFooterLink
