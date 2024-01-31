import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'
import { supplierValidate, supplyValidate } from '../../utils/validation/newValidate'
import { useMessageStore } from '../../store/messageStore'
import { convertDate } from '../../utils/functions/convertDate'

function NewSupply({setShowNewModule, postData}) {
  const setMessage = useMessageStore((state) => state.setMessage)
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [suppliers, setSuppliers] = useState([])
    const [books, setBooks] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [deliveryStatuses, setDeliveryStatuses] = useState([])
    const [values, setValues] = useState({
      selectedBooks: [],
      deliveryDate: '',
      paymentMethodID: null,
      deliveryStatusID: null,
      supplierID: null,
    })
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }  
    const getBooks = async () => {
      try{
        const response = await axiosClient.get(`/BookItems`)
        const options = response.data.map(item => ({
          value: item.id,
          label: item.bookTitle
        }))
        setBooks(options)
      }catch(e){
        console.log(e)
      }
  }
  const getSuppliers = async () => {
    try{
      const response = await axiosClient.get(`/Supplier`)
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setSuppliers(options)
    }catch(e){
      console.log(e)
    }
  }
  const getPaymentMethods = async () => {
    try{
      const response = await axiosClient.get(`/PaymentMethod`)
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setPaymentMethods(options)
    }catch(e){
      console.log(e)
    }
  }
  const getDeliveryStatuses = async () => {
    try{
      const response = await axiosClient.get(`/DeliveryStatus`)
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setDeliveryStatuses(options)
    }catch(e){
      console.log(e)
    }
  }
   
    const handleDeliveryStatusChange = (selectedOption) => {
      setValues({ ...values, deliveryStatusID: selectedOption })
    }
    const handlePaymentMethodChange = (selectedOption) => {
      setValues({ ...values, paymentMethodID: selectedOption })
    }
    const handleSupplierChange = (selectedOption) => {
      setValues({ ...values, supplierID: selectedOption })
    }
    const handleBooksChange = (selectedBooks) => {
      setValues({ ...values, selectedBooks })
    }
    const handleCloseModule = () => {
        setShowNewModule(false)
    }          
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(supplyValidate(values))
      } 
      const finishSubmit = () => {
        const convertedDate = convertDate(values.deliveryDate)
        const data = {
          deliveryDate: convertedDate,
          bookItems: values.selectedBooks.map((item) => ({
            id: item.value,
          })),
        }
          postData(data)
          handleCloseModule()
          setMessage({title: "Dostawa została dodana", type: 'success'})
        }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
    useEffect(() => {
      getBooks()
      getPaymentMethods()
      getDeliveryStatuses()
      getSuppliers()
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Dodaj nową dostawę</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect name="supplierID" error={errors.supplierID} onChange={handleSupplierChange} value={values.supplierID} options={suppliers} title='Dostawca' placeholder='Dostawca'/>
                <DefaultInput name="deliveryDate" onChange={handleChange} value={values.deliveryDate} error={errors.deliveryDate} type='date' title='Data dostawy'/>
                <DefaultSelect name="paymentMethodID" error={errors.paymentMethodID} onChange={handlePaymentMethodChange} value={values.paymentMethodID} options={paymentMethods} title='Metoda płatności' placeholder='Metoda płatności'/>
                <DefaultSelect name="deliveryStatusID" error={errors.deliveryStatusID} onChange={handleDeliveryStatusChange} value={values.deliveryStatusID} options={deliveryStatuses} title='Status dostawy' placeholder='Status dostawy'/>
            </div>
            <div className='divider' />
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect isMulti={true} name="selectedBooks" error={errors.selectedBooks} onChange={handleBooksChange} value={values.selectedBooks} options={books} title='Produkty w dostawie' placeholder='Produkty'/>
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default NewSupply
