import axios from "axios";
import axiosClient from "./apiClient";

export const getAllData = async (setData,table) => {
    try{
        const response = await axiosClient.get(`/${table}`)
        console.log(response.data);
        setData(response.data)
    }catch(err){
        console.error(err)
    }
}

export const postData = async (name, table) => {
    try{
        const response = await axiosClient.post(`/${table}`, {
            name: name,
        })
    }catch(err){
        console.error(err)
    }
}

export const putData = async (id, name, table) => {
    try{
        const response = await axiosClient.put(`/${table}/${id}`, {
            name: name,
        })
    }catch(err){
        console.error(err)
    }
}

export const deleteData = async (id, table) => {
    try{
        const response = await axiosClient.delete(`/${table}/${id}`)
    }catch(err){
        console.error(err)
    }
}