import { create } from "zustand";
import axiosClient from "../api/apiClient";
import { getValidToken } from "../api/getValidToken";

export const useAuthStore = create((set) => ({
    restoring: true,
    token: null,
    loading: false,
    error: null,
    userData: null,
    signIn: async (data) => {
        set({error: null, loading: true})
        try{
            const response = await axiosClient.post('/Account/login', data)
            if(response.status === 200){
                const userToken = response.data
                set({token: userToken})
                localStorage.setItem('token', JSON.stringify(userToken))
            }else{
                set({error: 'Nieudane logowanie'})
            }
        }catch(e){
            set({error: 'Błąd podczas logowania'})
        }
        set({loading: false})
    },
    signOut: async () => {
        localStorage.removeItem('token')
        set({token: null})
    },
    restoreToken: async () => {
        set({restoring: true, error: null})
        try{
            const rawToken = localStorage.getItem('token');
            if (rawToken) {
                const userToken = rawToken.replace(/^"|"$/g, '');
                const response = await axiosClient.post(`/Account/CheckTokenValidity?token=${userToken}`)
                if(response.status === 200 || response.status === 204){
                    set({ token: userToken })
                }else{
                    set({token: null})
                }
            }else{
                set({ token: null })
            }
        }catch(e){
            console.log(e)
        }
        set({restoring: false})
    },
    getUserData: async() => {
        set({error: null, loading: true})
        try{
            const rawToken = localStorage.getItem('token')
            if(rawToken){
                const token = rawToken.replace(/^"|"$/g, '')
                const response = await axiosClient.get('User',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                }})
                if(response.status === 200 || response.status === 204){
                    set({userData: response.data})
                }else{
                    set({error: 'Nie można pobrać danych'})
                }
            }else{
                set({ token: null })
            }
            set({loading: false})
        }catch(e){
            console.log(e)
        }
    },
    editUserData: async(data, setSuccess) => {
        try{
            const rawToken = localStorage.getItem('token')
            if(rawToken){
                const token = rawToken.replace(/^"|"$/g, '')
                const response = await axiosClient.put('User',data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                }})
                if(response.status === 200 || response.status === 204){
                    setSuccess(true)
                }else{
                    set({error: 'Nie można zmienić danych użytkownika'})
                    setSuccess(false)
                }
            }else{
                set({ token: null })
            }
        }catch(e){
            console.log(e)
        }
    },
    changeUserPassword: async(data,setSuccess) => {
        try{
            const rawToken = localStorage.getItem('token')
            if(rawToken){
                const token = rawToken.replace(/^"|"$/g, '')
                const response = await axiosClient.put('User/Password',data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                }})
                if(response.status === 200 || response.status === 204){
                    setSuccess(true)
                }else{
                    set({error: 'Nie można zmienić hasła'})
                    setSuccess(false)
                }
            }else{
                set({ token: null })
            }
        }catch(e){
            console.log(e)
        }
    },
}))