import axios from "axios"
import {getValidToken} from './getValidToken'
const token = getValidToken()
const axiosTokenClient = axios.create({
    baseURL: `https://localhost:7247/api`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
  })
  export default axiosTokenClient