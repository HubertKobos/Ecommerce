import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payingMethod: localStorage.getItem("payingMethodHIU") ? JSON.parse(localStorage.getItem("payingMethodHIU")) : [],
    transportMethod: localStorage.getItem('transportMethodHIU') ? JSON.parse(localStorage.getItem('transportMethodHIU')) : []
}

const payingMethodsSlice = createSlice({
    name: 'payingMethods',
    initialState,
    reducers:{
        savePayingMethod: (state, action) =>{

            state.payingMethod = action.payload.paymentMethod
            state.transportMethod = action.payload.transportMethod
            localStorage.setItem('payingMethodHIU', JSON.stringify(state.payingMethod))
            localStorage.setItem('transportMethodHIU', JSON.stringify(state.transportMethod))

            
        }
    },
})

export const { savePayingMethod } = payingMethodsSlice.actions

export default payingMethodsSlice.reducer