import axiosClient from "./apiClient"
import { getValidToken } from "./getValidToken"

export const getWeeklySummary = async (setData) => {
    try{
      const token = getValidToken()
      if(token){
      const response = await axiosClient.get('/CMS/WeeklySummary',{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      }})
      if(response.status === 200 || response.status === 204){
        setData(response.data)
      }
    }
    }catch(e){
      console.log(e)
    }
}