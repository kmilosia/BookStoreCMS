import { configureStore } from "@reduxjs/toolkit";
import userSlice, { authMiddleware } from './userSlice'

const store = configureStore({
    reducer:{
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})

export default store
