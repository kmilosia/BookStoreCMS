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
                set({decodedToken: null})
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
                set({decodedToken: null})
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
                set({decodedToken: null})
            }
        }catch(e){
            console.log(e)
        }
    },
    recoverPassword: async(data, setSuccess) => {
        try{
            set({error: null, loading: true})
                const response = await axiosClient.post('Account/ForgotPassword', data)
                if(response.status === 200 || response.status === 204){
                    setSuccess(true)
                    set({error: null})
                }else{
                    set({error: 'Błąd podczas sprawdzania danych. Sprawdź czy podany email jest prawidłowy.'})
                    setSuccess(false)
                }
        }catch(e){
            console.log(e)
        }
        set({ loading: false })
    },
    newPassword: async(data, setSuccess) => {
        try{
            set({error: null, loading: true})
                const response = await axiosClient.post('Account/ResetPassword', data)
                if(response.status === 200 || response.status === 204){
                    setSuccess(true)
                    set({error: null})
                }else{
                    set({error: 'Błąd podczas resetowania hasła. Sprawdź czy wszystkie dane są prawidłowe.'})
                    setSuccess(false)
                }
        }catch(e){
            console.log(e)
        }
        set({ loading: false })
    },
}))