import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'

function NewSupplier({setShowNewModule, postData}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [postcode, setPostcode] = useState('')
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const getCities = async () => {
        try{
          const response = await axiosClient.get(`/City`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCities(options)
        }catch(err){
          console.error(err)
        }
    }
    const getCountries = async () => {
        try{
          const response = await axiosClient.get(`/Country`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCountries(options)
        }catch(err){
          console.error(err)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneInput = (e) => {
        setPhone(e.target.value)
    }
    const handleStreetInput = (e) => {
        setStreet(e.target.value)
    }
    const handleStreetNumberInput = (e) => {
        setStreetNumber(e.target.value)
    }
    const handleHouseNumberInput = (e) => {
        setHouseNumber(e.target.value)
    }
    const handlePostcodeInput = (e) => {
        setPostcode(e.target.value)
    }
    const handleCityInput = (selectedCity) => {
        setSelectedCity(selectedCity)
    }
    const handleCountryInput = (selectedCountry) => {
        setSelectedCountry(selectedCountry)
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }   
    const handleAcceptButton = () => {
        const newaddress = {
            street: street,
            streetNumber: streetNumber,
            houseNumber: houseNumber,
            postcode: postcode,
            cityID: selectedCity.value,
            countryID: selectedCountry.value,
        }
        const data = {
            name: name,
            email: email,
            phoneNumber: phone,
            address: newaddress
        }
        console.log(data);
        postData(data)
        handleCloseModule()
    } 
    useEffect(() => {
        const fetchAll = async () => {
            try{
                getCities()
                getCountries()
            }catch(error){
                console.error(error)
            }
        }
        fetchAll()
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nowego dostawcę</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-3 gap-2'>
                <DefaultInput onChange={handleNameInput} type='text' placeholder='Nazwa' title='Nazwa dostawcy' />
                <DefaultInput onChange={handlePhoneInput} type='text' placeholder='Telefon' title='Numer telefonu' />
                <DefaultInput onChange={handleEmailInput} type='text' placeholder='E-mail' title='Adres e-mail' />
            </div>
            <div className='divider' />
            <h1 className='text-dracula-400 dark:text-dracula-300 mx-1 mb-1 font-semibold'>Adres dostawcy</h1>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultInput onChange={handleStreetInput} type='text' placeholder='Ulica' title='Ulica' />
                <DefaultInput onChange={handleStreetNumberInput} type='text' placeholder='Numer ulicy' title='Numer ulicy' />
                <DefaultInput onChange={handleHouseNumberInput} type='text' placeholder='Numer lokalu' title='Numer lokalu' />
                <DefaultInput onChange={handlePostcodeInput} type='text' placeholder='Kod pocztowy' title='Kod pocztowy' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect onChange={handleCityInput} value={selectedCity} options={cities} title='Miasto' placeholder='Miasto'/>
                <DefaultSelect onChange={handleCountryInput} value={selectedCountry} options={countries} title='Kraj' placeholder='Kraj'/>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewSupplier
