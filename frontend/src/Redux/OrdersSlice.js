import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://127.0.0.1:8000/api/orders/get'

const initialState = {
    orders: [],
    isLoading: true,
    error: false
}

const config = {
    headers:{
        "Content-Type": "multipart/form-data"
    }
}

export const getOrders = createAsyncThunk('orders/getOrders', async(userID, thunkAPI)=>{
    try{
        const resp = await axios.get(
            url + `/${userID}`,
            // config
            )
        return resp.data
    }catch(error){
        return thunkAPI.rejectWithValue("Wystąpił błąd, proszę spróbować ponownie później")
    }
})

const getOrdersSlice = createSlice({
    name: 'getOrders',
    initialState,
    extraReducers(builder){
        builder
            .addCase(getOrders.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
    }
})


export default getOrdersSlice.reducer