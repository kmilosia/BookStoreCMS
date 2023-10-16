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
  // useEffect(()=> {
  //   getFooterColumns()
  //   getItem(props.editedID)
  //   let selected = columns.find((col) => col.value === columnId);
  //   setSelectedOption(selected)
        
  // },[])
  return (
    <div className='module-wrapper' style={backgroundOverlayModule}>
        <div className='module-window'>
            <CloseWindowButton handleCloseModule={handleCloseModule} />
            <div className='module-content-wrapper'>
                <h1 className='module-header'>Edytuj link stopki</h1>
                <input onChange={handleNameInput} type='text' value={name} className='module-input-text'/>
                <input onChange={handlePositionInput} type='number' value={position} className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <input onChange={handlePathInput} type='text' value={path} className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <input onChange={handleUrlInput} type='text' value={url} className=' focus:border-dracula-500 focus:outline-none text-dracula-900 bg-dracula-200 resize-none rounded-md my-2 px-3 py-2 w-full border-[2px] border-dracula-600 dark:text-dracula-100 dark:bg-dracula-700 dark:placeholder:text-dracula-400'/>
                <Select onChange={handleSelectChange} value={selectedOption} options={columns} isClearable={true} className="my-react-select-container mx-3 w-[300px]" classNamePrefix="my-react-select" placeholder='Wybierz opcję..'/>
                <button onClick={handleAcceptButton} className='bg-orange-500 w-[100%] rounded-md py-2 my-2 text-dracula-100 font-semibold transition-all hover:bg-orange-600'>Akceptuj</button>
            </div>
        </div>
    </div>
  )
}

export default EditFooterLink
