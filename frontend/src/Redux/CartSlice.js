import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem("cartItemsHIU") ? JSON.parse(localStorage.getItem("cartItemsHIU")) : [],
    total: 0,
    discount: localStorage.getItem("discountHIU") ? JSON.parse(localStorage.getItem("discountHIU")) : 0,
    capacity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        clearCart: (state) =>{
            // state.items = [];
            localStorage.removeItem("cartItemsHIU")
        },
        clearCartWithState: (state) =>{
            state.items = [];
            state.discount = 0;
            localStorage.removeItem("cartItemsHIU")
            localStorage.removeItem("discountHIU")
        },
        appendItem: (state, action) =>{
            const existItem = state.items.find(x => x.name === action.payload.items.name) ? action.payload.items : false

            if(existItem){
                state.items.forEach((item)=>{
                    if(item.name === action.payload.items.name){
                        item.qty = action.payload.qty
                    }
                })
            }else{
                state.items.push({...action.payload.items, "qty": action.payload.qty, "itemIndex": state.items.length + 1})
            }
            localStorage.setItem("cartItemsHIU", JSON.stringify(state.items))
            
        },
        removeItem: (state, action) =>{
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId)
            for (let item in state.items){
                if (state.items[item].itemIndex !== 1){
                    state.items[item].itemIndex = parseInt(state.items[item].itemIndex) - 1
                }
                
            }
            localStorage.setItem("cartItemsHIU", JSON.stringify(state.items))
        },
        changeQty: (state, action) =>{
            const existItem = state.items.find(x => x.name === action.payload.item.name) ? action.payload.item : false
            if(existItem){
                state.items.forEach((item) =>{
                    if(item.name === existItem.name){
                        item.qty = action.payload.newQty
                    }
                })
                localStorage.setItem("cartItemsHIU", JSON.stringify(state.items))
            }
        },
        calculateTotal: (state) =>{
            let total = 0
            state.items.forEach((item) =>{
                total += item.price * item.qty
            })
            state.total = Number(total)
        },
        applyDiscount: (state, discount) => {
            state.total = state.total - Number(discount.payload)
            state.discount = Number(discount.payload)
            localStorage.setItem('discountHIU', JSON.stringify(state.discount))
        },
        deleteDiscount: (state) => {
            // state.total = state.total + Number(discount.payload)
            state.discount = 0
            localStorage.removeItem("discountHIU")
        }
    }
})

export const { clearCart, appendItem, removeItem, calculateTotal, changeQty, clearCartWithState, applyDiscount, deleteDiscount } = cartSlice.actions

export default cartSlice.reducer