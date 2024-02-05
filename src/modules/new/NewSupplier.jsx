import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'
import { supplierValidate } from '../../utils/validation/newValidate'

function NewSupplier({setShowNewModule, postData}) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [addressTypes, setAddressTypes] = useState([])
    const [values, setValues] = useState({
      name: '',
      email: '',
      phoneNumber: '',
      street: '',
      streetNumber: '',
      houseNumber: '',
      postcode: '',
      cityID: null,
      countryID: null,
      addressTypeID: null,
    })
    const handleChange = (e) => {
      const { name, value } = e.target
      setValues({ ...values, [name]: value })
    }  
    const getCities = async () => {
        try{
          const response = await axiosClient.get(`/City`)
          if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCities(options)
        }
        }catch(err){
          console.log(err)
        }
    }
    const getCountries = async () => {
        try{
          const response = await axiosClient.get(`/Country`)
          if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCountries(options)
        }
        }catch(err){
          console.log(err)
        }
    }
    const getAddressTypes = async () => {
        try{
          const response = await axiosClient.get(`/AddressType`)
          if(response.status === 200 || response.status === 204){
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setAddressTypes(options)
        }
        }catch(err){
          console.log(err)
        }
    }
    const handleCityChange = (selectedOption) => {
      setValues({ ...values, cityID: selectedOption })
    }
    const handleCountryChange = (selectedOption) => {
      setValues({ ...values, countryID: selectedOption })
    }
    const handleAddressTypeChange = (selectedOption) => {
      setValues({ ...values, addressTypeID: selectedOption })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }          
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(supplierValidate(values))
      } 
      const finishSubmit = () => {
        const newaddress = {
            street: values.street,
            streetNumber: values.streetNumber,
            houseNumber: values.houseNumber,
            postcode: values.postcode,
            cityID: values.cityID.value,
            countryID: values.countryID.value,
            addressTypeID: values.addressTypeID.value,
          }
          const data = {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            address: newaddress,
          }
          postData(data)
          handleCloseModule()
        }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
    useEffect(() => {
      getCities()
      getCountries()
      getAddressTypes()
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
                <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Nazwa' title='Nazwa dostawcy' />
                <DefaultInput name="phoneNumber" error={errors.phoneNumber} onChange={handleChange} type='text' placeholder='Telefon' title='Numer telefonu' />
                <DefaultInput name="email" error={errors.email} onChange={handleChange} type='text' placeholder='Email' title='Adres email' />
            </div>
            <div className='divider' />
            <h1 className='text-dracula-500 dark:text-dracula-300 mb-1 font-semibold'>Adres dostawcy</h1>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="street" error={errors.street} onChange={handleChange} type='text' placeholder='Ulica' title='Ulica' />
                <DefaultInput name="streetNumber" error={errors.streetNumber} onChange={handleChange} type='text' placeholder='Numer ulicy' title='Numer ulicy' />
                <DefaultInput name="houseNumber" error={errors.houseNumber} onChange={handleChange} type='text' placeholder='Numer lokalu' title='Numer lokalu' />
                <DefaultInput name="postcode" error={errors.postcode} onChange={handleChange} type='text' placeholder='Kod pocztowy' title='Kod pocztowy' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect name="cityID" error={errors.cityID} onChange={handleCityChange} value={values.cityID} options={cities} title='Miasto' placeholder='Miasto'/>
                <DefaultSelect name="countryID" error={errors.countryID} onChange={handleCountryChange} value={values.countryID} options={countries} title='Kraj' placeholder='Kraj'/>
                <DefaultSelect name="addressTypeID" error={errors.addressTypeID} onChange={handleAddressTypeChange} value={values.addressTypeID} options={addressTypes} title='Typ adresu' placeholder='Typ adresu'/>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewSupplier
