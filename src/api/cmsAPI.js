import axiosClient from "./apiClient"

export const getWeeklySummary = async (setData) => {
    try{
      const response = await axiosClient.get('/CMS/WeeklySummary')
      if(response.status === 200 || response.status === 204){
        setData(response.data)
      }
    }catch(e){
      console.log(e)
    }
}