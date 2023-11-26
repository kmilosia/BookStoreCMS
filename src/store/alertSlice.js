import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    showAlert: false,
    alertTitle: '',
}
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.showAlert = true;
            state.alertTitle = action.payload.title;
          },
          hideAlert: (state) => {
            state.showAlert = false;
            state.alertTitle = '';
          },
    },

})
export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer
