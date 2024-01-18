import axiosClient from "./apiClient"

export const getAuthors = async (setData, setLoading) => {
    try{
        const response = await axiosClient.get('/Author')
        setData(response.data)
        setLoading(false)
    }catch(e){
        console.log(e)
        setLoading(false)
    }
  }
  export const deleteAuthor = async (id) => {
    try{
        const response = await axiosClient.delete(`/Author/${id}`)
      }catch(e){
        console.log(e)
    }
  }
  export const getAuthor = async (id, setData, setLoading) => {
    try{
      const response = await axiosClient.get(`/Author/${id}`)
      setData(response.data)
      setLoading(false)
    }catch(e){
      console.log(e)
    }
}
export const addAuthor = async (data, setLoading) => {
    try{
        const response = await axiosClient.post(`/Author`, data)
        setLoading(false)
      }catch(e){
        console.log(e)
    }
  }
export const editAuthor = async (data, setLoading) => {
    try{
        const response = await axiosClient.put(`/Author/${data.id}`, data)
        setLoading(false)
    }catch(e){
      console.log(e)
    }
}