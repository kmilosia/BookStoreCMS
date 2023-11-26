import { configureStore } from "@reduxjs/toolkit";
import userSlice, { authMiddleware } from './userSlice'
import alertSlice from "./alertSlice";

const store = configureStore({
    reducer:{
        user: userSlice,
        alert: alertSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})

export default store
