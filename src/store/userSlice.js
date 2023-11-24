import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/apiClient";
import {getValidToken} from '../api/getValidToken'

const initialState = {
    loading:false,
    error:null,
    isAuth: false,
    success: false,
    userData: null,
}
export const checkTokenValidity = async (token) => {
    try {
        const request = await axiosClient.post(`Account/CheckTokenValidity?token=${token}`);
        return request.data === 'Valid';
    } catch (error) {
      console.error('Błąd przy uwierzytelnianiu użytkownika - token jest przeterminowany!');
      return false;
    }
  };
  export const checkUserLogin = createAsyncThunk(
    'user/auth',
    async () => {
    console.log("checking user login");
      const rawToken = localStorage.getItem('token');
      if (rawToken) {
        const token = rawToken.replace(/^"|"$/g, '');
        const isLogged = await checkTokenValidity(token);
        return isLogged;
      } else {
        return false;
      }
    }
  );
export const loginUser = createAsyncThunk(
    'user/login',
    async(userCredentials) => {
        const request = await axiosClient.post('/Account/login', userCredentials)
        return request.data
    }
)
export const fetchUserData = createAsyncThunk(
    'user/data',
    async() => {
        const token = getValidToken()
        const response = await axiosClient.get('User/Data',{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
        }})
        return response.data
    }
)
export const editUserData = createAsyncThunk(
    'user/editData',
    async(data) => {
        const token = getValidToken()
        const request = await axiosClient.put('/User/Edit-Data', data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        return request.data
    }
)
export const changePassword = createAsyncThunk(
    'user/changePassword',
    async(data) => {
        const token = getValidToken()
        const request = await axiosClient.put('/User/Edit-Password', data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        return request.data
    }
)
export const authMiddleware = (store) => (next) => (action) => {
    if (action.type === 'user/logout') {
      localStorage.removeItem('token')
    } else if (loginUser.fulfilled.match(action)) {
      const token = action.payload;
      localStorage.setItem('token', JSON.stringify(token));
    }
    return next(action);
  }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state,action) => {
            state.isAuth = false
            state.success = false
            state.userData = null
            state.error = null
        },
        resetState: (state,action) => {
            state.success = false
            state.error = false
            state.isAuth = false
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isAuth = true
            state.loading = false
        }).addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = "Nieudane logowanie!"
        }).addCase(fetchUserData.pending,(state)=>{
            state.loading = true
        }).addCase(fetchUserData.fulfilled,(state,action)=>{
            state.loading = false
            state.userData = action.payload
        }).addCase(fetchUserData.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie można pobrać danych użytkownika!' 
        }).addCase(editUserData.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(editUserData.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(editUserData.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie udało się zmienić danych!' 
        }).addCase(changePassword.pending,(state)=>{
            state.loading = true
            state.success = false
        }).addCase(changePassword.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
        }).addCase(changePassword.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie udało się zmienić hasła!' 
        }).addCase(checkUserLogin.fulfilled, (state, action) => {
            state.isAuth = action.payload;
        })
    }
})
export const { logout, resetState } = userSlice.actions
export default userSlice.reducer
