import axiosClient from "./apiClient"

export const getWeeklySummary = async (setData) => {
    try{
      const response = await axiosClient.get('/CMS/WeeklySummary')
      setData(response.data)
    }catch(e){
      console.log(e)
    }
}