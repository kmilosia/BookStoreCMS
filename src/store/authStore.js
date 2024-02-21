import { create } from "zustand";
import axiosClient from "../api/apiClient";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => ({
    restoring: true,
    token: null,
    decodedToken: null,
    loading: false,
    error: null,
    userData: null,
    signIn: async (data) => {
        set({error: null, loading: true})
        try{
            const response = await axiosClient.post('/Account/login', data)
            if(response.status === 200){
                const userToken = response.data
                const decoded = jwtDecode(userToken)
                set({token: userToken})
                set({decodedToken: decoded})
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
                    const decoded = jwtDecode(userToken)
                    set({decodedToken: decoded})
                }else{
                    set({token: null})
                    set({decodedToken: null})
                }
            }else{
                set({ token: null })
                set({decodedToken: null})
            }
        }catch(e){
            console.log(e)
            set({ token: null })
            set({decodedToken: null})
        }
        set({restoring: false})
    },
    getUserData: async() => {
        set({error: null, loading: true})
        try{
            const rawToken = localStorage.getItem('token')
            if(rawToken){
                const token = rawToken.replace(/^"|"$/g, '')
                const response = await axiosClient.get('Employee/Data',{
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
                set({decodedToken: null})
            }
            set({loading: false})
        }catch(e){
            console.log(e)
        }
    },
}))