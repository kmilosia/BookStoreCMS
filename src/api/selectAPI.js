import axiosClient from "./apiClient"
import { getValidToken } from "./getValidToken"

export const getAddressTypes = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/AddressType`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getAuthors = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Author`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
        const options = response.data.map(item => ({
          value: item.id,
          label: item.name + " " + item.surname
        }))
        setData(options)  
      }}
    }catch(err){
      console.log(err)
    }
}
export const getAvailabilities = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Availability`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getBooks = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Book`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
        const options = response.data.map(item => ({
          value: item.id,
          label: item.title
        }))
        setData(options)  
      }}
    }catch(err){
      console.log(err)
    }
}
export const getBookItems = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/BookItems`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.bookTitle
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getCities = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/City`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getCountries = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Country`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getFormBookItems = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/BookItems`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item,
        label: item.bookTitle + " (" + item.formName + ")"
      }))
      setData(options)
    }}
    }catch(e){
      console.log(e)
    }
    }
export const getCategories = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Category`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
        const options = response.data.map(item => ({
          value: item.id,
          label: item.name
        }))
        setData(options)  
      }}
    }catch(err){
      console.log(err)
    }
}
export const getDeliveryStatuses = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/DeliveryStatus`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(e){
      console.log(e)
    }
  }
export const getEditions = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Edition`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getFileFormats = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/FileFormat`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}
export const getFooterColumns = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/FooterColumns`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const optionColumns = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(optionColumns)
      }}
    }catch(err){
      console.log(err)
    }
}
export const getForms = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Form`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}

export const getLanguages = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Language`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
        const options = response.data.map(item => ({
          value: item.id,
          label: item.name
        }))
        setData(options)  
      }}
    }catch(err){
      console.log(err)
    }
}
export const getPaymentMethods = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/PaymentMethod`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(e){
      console.log(e)
    }
  }
export const getPublishers = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Publisher`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
        const options = response.data.map(item => ({
          value: item.id,
          label: item.name
        }))
        setData(options)  
      }}
    }catch(err){
      console.log(err)
    }
}
export const getSuppliers = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Supplier`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name
      }))
      setData(options)
    }}
    }catch(e){
      console.log(e)
    }
  }
export const getTranslators = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get(`/Translator`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
      const options = response.data.map(item => ({
        value: item.id,
        label: item.name + " " + item.surname
      }))
      setData(options)
    }}
    }catch(err){
      console.log(err)
    }
}