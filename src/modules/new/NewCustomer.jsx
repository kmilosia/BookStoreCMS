import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/CloseWindowButton'
import { useEffect } from 'react'
import axiosClient from '../../api/apiClient'
import { FiMinus, FiPlus } from 'react-icons/fi'
import DefaultSelect from '../../components/forms/DefaultSelect'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultTextarea from '../../components/forms/DefaultTextarea'

function NewCustomer({setShowNewModule,postData}) {
    const today = new Date().toISOString().split('T')[0];
    const [genderOptions, setGenderOptions] = useState([])
    const [selectedGender, setSelectedGender] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState(today)
    const [isSubscribed, setIsSubscribed] = useState(false)

    

    const getGenders = async () => {
        try{
          const response = await axiosClient.get(`/Gender`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setGenderOptions(options)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleSurnameInput = (e) => {
        setSurname(e.target.value)
    }
    const handlePhoneInput = (e) => {
        setPhone(e.target.value)
    }
    const handleBirthdayInput = (e) => {
        setBirthday(e.target.value)
    }
    const handleGenderInput = (selectedGender) => {
        setSelectedGender(selectedGender)
    }
    const handleAddAddress = () => {
        setAddresses([...addresses,{title: imageTitle, imageURL: imageURL}])
        setImageTitle('')
        setImageURL('')
        console.log(selectedImages);
      }
  return (
    <div>
      
    </div>
  )
}

export default NewCustomer
