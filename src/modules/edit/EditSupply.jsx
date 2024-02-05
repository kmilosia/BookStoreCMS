import React from 'react'
import { useState } from 'react'
import { backgroundOverlayModule } from '../../styles'
import CloseWindowButton from '../../components/buttons/CloseWindowButton'
import DefaultInput from '../../components/forms/DefaultInput'
import DefaultSelect from '../../components/forms/DefaultSelect'
import axiosClient from '../../api/apiClient'
import { useEffect } from 'react'
import { supplyEditValidate } from '../../utils/validation/newValidate'
import { convertDate, convertDateToInput } from '../../utils/functions/convertDate'
import Select from 'react-select'
import { IoClose } from "react-icons/io5";

function EditSupply(props) {
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [suppliers, setSuppliers] = useState([])
    const [books, setBooks] = useState([])
    const [deliveryStatuses, setDeliveryStatuses] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [bruttoPrice, setBruttoPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [productError, setProductError] = useState(null)
    const [values, setValues] = useState({
      bookItems: [],
      deliveryDate: '',
      deliveryStatusID: null,
      supplierID: null,
    })
  const getSuppliers = async () => {
    try{
      const response = await axiosClient.get(`/Supplier`)
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setSuppliers(options)
    }
    }catch(e){
      console.log(e)
    }
  }
  const getDeliveryStatuses = async () => {
    try{
      const response = await axiosClient.get(`/DeliveryStatus`)
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setDeliveryStatuses(options)
    }
    }catch(e){
      console.log(e)
    }
  }
  const getBooks = async () => {
    try{
      const response = await axiosClient.get(`/BookItems`)
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item,
        label: item.bookTitle + " (" + item.formName + ")"
      }))
      setBooks(options)
    }
    }catch(e){
      console.log(e)
    }
    }
    const getItem = async (id) => {
      try{
        const response = await axiosClient.get(`/Supply/${id}`)
        if(response.status === 200 || response.status === 204){
          const newDate = new Date(response.data.deliveryDate)
          setValues({
            deliveryDate: convertDateToInput(newDate),
            deliveryStatusID: { value: response.data.deliveryStatusId, label: response.data.deliveryStatusName },
            supplierID: { value: response.data.supplierData.id, label: response.data.supplierData.name },
            bookItems: response.data.supplyBooksData.map((item) => ({
              bookID: item.bookItemId,
              bookTitle: item.bookTitle,
              bruttoPrice: item.bruttoPrice,
              formName: item.formName,
              quantity: item.quantity,
            })),
          })
        }
      }catch(err){
        console.log(err)
      }
  }
    const handleDateChange = (e) => {
      setValues({ ...values, deliveryDate: e.target.value })
    }   
    const handleDeliveryStatusChange = (selectedOption) => {
      setValues({ ...values, deliveryStatusID: selectedOption })
    }
    const handleSupplierChange = (selectedOption) => {
      setValues({ ...values, supplierID: selectedOption })
    }
    const handleBooksChange = (selectedBook) => {
      setSelectedBook(selectedBook)
    }
    const removeBookItem = (bookID) => {
      const updatedBookItems = values.bookItems.filter(item => item.bookID !== bookID)
      setValues({ ...values, bookItems: updatedBookItems })
    }
    const addNewProduct = () => {
      console.log(selectedBook);
      if((selectedBook.value.formName === 'Book' && (quantity <= 0 || !quantity)) || (bruttoPrice <= 0 || !bruttoPrice)){
        setProductError("Wprowadź prawidłowe dane (ilość ani cena brutto nie mogą być mniejsze niż 1!")
      }else{
        const existingBook = values.bookItems.find(item => item.bookID === selectedBook.value.bookID)
        if(!existingBook){
          const currentBookItems = values.bookItems
          const newBookItem = {
            ...selectedBook.value,
            bruttoPrice: Number(bruttoPrice)
          }
          if(selectedBook.value.formName === 'Book'){
            newBookItem.quantity = Number(quantity)
          }
          const updatedBookItems = [...currentBookItems, newBookItem]
          setValues({ ...values, bookItems: updatedBookItems })
        }else{
          console.log(existingBook);
        }
        setSelectedBook(null)
        setQuantity(0)
        setBruttoPrice(0)
        setProductError(null)
      }
    }
    const handleCloseModule = () => {
        props.setShowEditModule(false)
        props.setEditedID(null)
    }          
    const handleAcceptButton = () => {
        setSubmitting(true)
        setErrors(supplyEditValidate(values))
      } 
      const finishSubmit = () => {
        const convertedDate = convertDate(values.deliveryDate)
        const data = {
          supplierId: values.supplierID.value,
          deliveryStatusId: values.deliveryStatusID.value,
          deliveryDate: convertedDate,
          bookItems: values.bookItems.map((item) => {
            const bookItemData = {
              bookItemId: item.bookID,
              bruttoPrice: item.bruttoPrice
          }
          if(item.quantity) {
              bookItemData.quantity = item.quantity
          }
          return bookItemData
          }),
        }
          props.putData(props.editedID,data)
          handleCloseModule()
        }
      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit()
        }
      }, [errors])
    useEffect(() => {
      getBooks()
      getDeliveryStatuses()
      getSuppliers()
      getItem(props.editedID)
    },[])
  return (
    <div className='module-wrapper center-elements' style={backgroundOverlayModule}>
    <div className='module-window'>
        <div className='module-content-wrapper'>
        <div className='module-header-row'>
              <h1 className='module-header'>Edytuj dostawę</h1>
              <CloseWindowButton handleCloseModule={handleCloseModule} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <DefaultSelect name="supplierID" error={errors.supplierID} onChange={handleSupplierChange} value={values.supplierID} options={suppliers} title='Dostawca' placeholder='Dostawca'/>
                <DefaultInput name="deliveryDate" onChange={handleDateChange} value={values.deliveryDate} error={errors.deliveryDate} type='date' title='Data dostawy'/>
                <DefaultSelect name="deliveryStatusID" error={errors.deliveryStatusID} onChange={handleDeliveryStatusChange} value={values.deliveryStatusID} options={deliveryStatuses} title='Status dostawy' placeholder='Status dostawy'/>
            </div>
            <div className='divider' />
            <h2 className='font-semibold text-xl text-dracula-600 dark:text-dracula-300 mb-2'>Produkty</h2>
            <div className='grid grid-cols-1 gap-2'>
              <div className='flex flex-col mb-1'>
                  <Select value={selectedBook} name='bookItems' id='bookItems' onChange={handleBooksChange} maxMenuHeight={140} placeholder="Dodaj produkt" options={books} isClearable={true} isSearchable={true}className="my-react-select-module-container w-full" classNamePrefix="my-react-select-module"/>
                  {selectedBook &&
                  <>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    <DefaultInput name="bruttoPrice" onChange={(e) => {setBruttoPrice(e.target.value)}} value={bruttoPrice} type='number' title='Cena brutto'/>
                    {selectedBook?.value?.formName === 'Book' &&
                    <DefaultInput name="quantity" onChange={(e) => {setQuantity(e.target.value)}} value={quantity} type='number' title='Ilość'/>
                    }
                    <button onClick={addNewProduct} className='default-border-button w-max self-end'>Dodaj produkt</button>
                  </div>
                  {productError && <p className='error-text'>{productError}</p>}
                  </>
                  }
              </div>
              <div className='grid grid-cols-1 gap-2'>
                {values.bookItems.length > 0 && values.bookItems.map((item,index) => {
                  return(
                    <div key={index} className='flex flex-row items-center justify-between border-2 border-gray-200 dark:border-dracula-700 rounded-md p-3'>
                      <div className='flex flex-col'>
                        <h1 className='font-semibold'>{item.bookTitle}</h1>
                        <h2 className='text-sm'>{item.formName === 'Book' ? 'Książka' : 'Ebook'}</h2>
                      </div>
                      <div className='flex flex-col items-end justify-start h-full'>
                        <button onClick={() => removeBookItem(item.bookID)} className='text-xl dark:text-white'><IoClose /></button>
                        <div className='flex flex-col mt-4 text-sm font-light items-end'>
                          {item.quantity && <p>Ilość: {item.quantity}</p>}
                          <p>Cena brutto: {item?.bruttoPrice?.toFixed(2)}zł</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {errors.bookItems && <p className='error-text'>{errors.bookItems}</p>}
            </div>
            <button onClick={handleAcceptButton} className='module-button'>Akceptuj</button>
        </div>
    </div>
</div>
  )
}

export default EditSupply
