import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAddress: localStorage.getItem("shippingAddressHIU") ? JSON.parse(localStorage.getItem("shippingAddressHIU")) : [],
    transportPrice: 0,
    isLoading: false,
}

const shippingAddressSlice = createSlice({
    name: 'shippingAddress',
    initialState,
    reducers:{
        saveAddress: (state, action) =>{
            
            state.shippingAddress = action.payload
            localStorage.setItem('shippingAddressHIU', JSON.stringify(state.shippingAddress))

            
        },
        setTransportPrice: (state, action) =>{
            state.isLoading = true
            let dist = /\d+(,\d+)?/.exec(action.payload) // replace all leading non-digits with nothing
            state.transportPrice = parseFloat(dist[0].replace(",", "."))
            // console.log(parseFloat(shippingAddress.transportPrice[0].replace(",", ".")))
            let cart = JSON.parse(localStorage.getItem("shippingAddressHIU"))
            cart["transportPrice"] = state.transportPrice
            localStorage.setItem("shippingAddressHIU", JSON.stringify(cart))
            state.isLoading = false
        },
    },
    
})

export const { saveAddress, setTransportPrice } = shippingAddressSlice.actions

export default shippingAddressSlice.reducer