import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'
import { supplierValidate } from '../../utils/validation/newValidate'
import { useMessageStore } from '../../store/messageStore'

function NewSupplier({setShowNewModule, postData}) {
  const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [values, setValues] = useState({
      name: '',
      email: '',
      phoneNumber: '',
      street: '',
      streetNumber: '',
      houseNumber: '',
      postcode: '',
      selectedCity: null,
      selectedCountry: null,
      selectedType: null,
    })
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [addressTypes, setAddressTypes] = useState([])
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
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
    const getAddressTypes = async () => {
        try{
          const response = await axiosClient.get(`/AddressType`)
          const options = response.data.map(item => ({
            value: item.id,
            label: item.name
          }))
          setCountries(options)
        }catch(err){
          console.error(err)
        }
    }
    const handleCityInput = (selectedCity) => {
        setValues({ ...values, selectedCity });
    }
    const handleCountryInput = (selectedCountry) => {
        setValues({ ...values, selectedCountry });
    }
    const handleAddressType = (selectedType) => {
        setValues({ ...values, selectedType });
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
            cityID: values.selectedCity.value,
            countryID: values.selectedCountry.value,
            addressTypeID: values.selectedType.value,
          }
        const data = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: newaddress,
        };     
          postData(data)
          handleCloseModule()
          setMessage({title: "Dostawca został dodany", type: 'success'})
        }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
    useEffect(() => {
        const fetchAll = async () => {
            try{
                getCities()
                getCountries()
                getAddressTypes()
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
                <DefaultInput name="name" error={errors.name} onChange={handleChange} type='text' placeholder='Nazwa' title='Nazwa dostawcy' />
                <DefaultInput name="phoneNumber" error={errors.phoneNumber} onChange={handleChange} type='text' placeholder='Telefon' title='Numer telefonu' />
                <DefaultInput name="email" error={errors.email} onChange={handleChange} type='text' placeholder='Email' title='Adres email' />
            </div>
            <div className='divider' />
            <h1 className='text-dracula-400 dark:text-dracula-300 mx-1 mb-1 font-semibold'>Adres dostawcy</h1>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="street" error={errors.street} onChange={handleChange} type='text' placeholder='Ulica' title='Ulica' />
                <DefaultInput name="streetNumber" error={errors.streetNumber} onChange={handleChange} type='text' placeholder='Numer ulicy' title='Numer ulicy' />
                <DefaultInput name="houseNumber" error={errors.houseNumber} onChange={handleChange} type='text' placeholder='Numer lokalu' title='Numer lokalu' />
                <DefaultInput name="postcode" error={errors.postcode} onChange={handleChange} type='text' placeholder='Kod pocztowy' title='Kod pocztowy' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect name="selectedCity" error={errors.selectedCity} onChange={handleCityInput} value={values.selectedCity} options={cities} title='Miasto' placeholder='Miasto'/>
                <DefaultSelect name="selectedCountry" error={errors.selectedCountry} onChange={handleCountryInput} value={values.selectedCountry} options={countries} title='Kraj' placeholder='Kraj'/>
                <DefaultSelect name="selectedType" error={errors.selectedType} onChange={handleAddressType} value={values.selectedType} options={addressTypes} title='Typ adresu' placeholder='Typ adresu'/>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewSupplier
