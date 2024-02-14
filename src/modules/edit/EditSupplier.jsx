import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../../api/apiClient'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import { backgroundOverlayModule } from '../../styles'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import { supplierValidate } from '../../utils/validation/newValidate'
import { getAddressTypes, getCities, getCountries } from '../../api/selectAPI'
import { getValidToken } from '../../api/getValidToken'

function EditSupplier(props) {
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
    const { name, value } = e.target;
    setValues(prevValues => ({...prevValues,[name]: value}))
}
const handleCityChange = (selectedCity) => {
    setValues(prevValues => ({...prevValues,cityID: selectedCity}))
}
const handleCountryChange = (selectedCountry) => {
    setValues(prevValues => ({...prevValues,countryID: selectedCountry}))
}
const handleAddressTypeChange = (selectedAddressType) => {
    setValues(prevValues => ({...prevValues,addressTypeID: selectedAddressType}))
}
    const getItem = async (id) => {
        try{
          const token = getValidToken()
          if(token){    
          const response = await axiosClient.get(`/Supplier/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
          }})
          if(response.status === 200 || response.status === 204){
            const newSupplier = response.data
            const newAddress = response.data.supplierAddress
            setValues({
                name: newSupplier.name,
                email: newSupplier.email,
                phoneNumber: newSupplier.phoneNumber,
                street: newAddress.street,
                streetNumber: newAddress.streetNumber,
                houseNumber: newAddress.houseNumber,
                postcode: newAddress.postcode,
                cityID: { value: newAddress.cityID, label: newAddress.cityName },
                countryID: { value: newAddress.countryID, label: newAddress.countryName },
                addressTypeID: { value: newAddress.addressTypeID, label: newSupplier.addressTypeName },
            })
          }}
        }catch(err){
          console.log(err)
        }
    }
    const handleCloseModule = () => {
      props.setEditedID(null)
      props.setShowEditModule(false)
    }
    const handleSaveClick = () => {
      setSubmitting(true)
      setErrors(supplierValidate(values))
    }
    const finishSubmit = () => {
      const data = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: {
          street: values.street,
          streetNumber: values.streetNumber,
          houseNumber: values.houseNumber,
          postcode: values.postcode,
          cityID: values.cityID.value,
          countryID: values.countryID.value,
          addressTypeID: values.addressTypeID.value,
        }
      }
      props.putData(props.editedID, data)
      handleCloseModule()
    }
  useEffect(()=> {
    getCities(setCities)
    getCountries(setCountries)
    getAddressTypes(setAddressTypes)
    getItem(props.editedID)
  },[])
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj dostawcę</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>   
            <div className='grid grid-cols-3 gap-2'>
                <DefaultInput name="name" error={errors.name} onChange={handleChange} value={values.name} type='text' placeholder='Nazwa' title='Nazwa dostawcy' />
                <DefaultInput name="phoneNumber" error={errors.phoneNumber} onChange={handleChange} value={values.phoneNumber} type='text' placeholder='Telefon' title='Numer telefonu' />
                <DefaultInput name="email" error={errors.email} onChange={handleChange} value={values.email} type='text' placeholder='Email' title='Adres email' />
            </div>
            <div className='divider' />
            <h1 className='text-dracula-500 dark:text-dracula-300 mb-1 font-semibold'>Adres dostawcy</h1>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultInput name="street" error={errors.street} onChange={handleChange} value={values.street} type='text' placeholder='Ulica' title='Ulica' />
                <DefaultInput name="streetNumber" error={errors.streetNumber} onChange={handleChange} value={values.streetNumber} type='text' placeholder='Numer ulicy' title='Numer ulicy' />
                <DefaultInput name="houseNumber" error={errors.houseNumber} onChange={handleChange} value={values.houseNumber} type='text' placeholder='Numer lokalu' title='Numer lokalu' />
                <DefaultInput name="postcode" error={errors.postcode} onChange={handleChange} value={values.postcode} type='text' placeholder='Kod pocztowy' title='Kod pocztowy' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect name="cityID" error={errors.cityID} onChange={handleCityChange} value={values.cityID} options={cities} title='Miasto' placeholder='Miasto'/>
                <DefaultSelect name="countryID" error={errors.countryID} onChange={handleCountryChange} value={values.countryID} options={countries} title='Kraj' placeholder='Kraj'/>
                <DefaultSelect name="addressTypeID" error={errors.addressTypeID} onChange={handleAddressTypeChange} value={values.addressTypeID} options={addressTypes} title='Typ adresu' placeholder='Typ adresu'/>
            </div>             
            <button onClick={() => handleSaveClick()} className='module-button'>Akceptuj</button>
        </div>
    </div>
    </div>
  )
}

export default EditSupplier
