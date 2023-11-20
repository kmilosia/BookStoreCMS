import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/apiClient";
import axiosTokenClient from "../api/apiTokenClient";

const initialState = {
    loading:false,
    error:null,
    isAuth: false,
    success: false,
    userData: null,
}
export const loginUser = createAsyncThunk(
    'user/login',
    async(userCredentials) => {
        const request = await axiosClient.post('/Account/login', userCredentials)
        return request.data
    }
)
export const fetchUserData = createAsyncThunk(
    'user/info',
    async() => {
        const response = await axiosTokenClient.get('User/info')
        return response.data
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
            state.success = false
        }).addCase(fetchUserData.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.userData = action.payload
        }).addCase(fetchUserData.rejected,(state,action)=>{
            state.loading = false
            state.error = 'Nie można pobrać danych użytkownika!' 
        })
    }
})
export const { logout, resetState } = userSlice.actions
export default userSlice.reducer
