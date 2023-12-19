import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem("deliveryDateHIU") ? localStorage.getItem("deliveryDateHIU") : []
}

const bookedDeliveryDate = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        appendDeliveryDate: (state, action) =>{
            state.items = []
            localStorage.setItem("deliveryDateHIU", action.payload)
            state.items.push(action.payload)

        },
        clearDate: (state, action) => {
            state.items = []
        }
    }
})

export const { appendDeliveryDate, clearDate } = bookedDeliveryDate.actions

export default bookedDeliveryDate.reducer